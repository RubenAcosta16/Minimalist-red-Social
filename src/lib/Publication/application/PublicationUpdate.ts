import { ImageDbRepository } from "../../Image/domain/repository/ImageDbRepository";
import { ImageUrl } from "../../Image/domain/props/ImageUrl";
import { ImageUpdateApplication } from "../../shared/application/Image/ImageUpdateApplications";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { PublicationError } from "../domain/errors";
import { PublicationDate } from "../domain/props/PublicationDate";
import { PublicationId } from "../domain/props/PublicationId";
import { PublicationContent } from "../domain/props/PublicationsContent";
import { Publication } from "../domain/Publication";
import { PublicationDbRepository } from "../domain/PublicationRepository";

export class PublicationUpdate {
  constructor(
    private publicationDbRepository: PublicationDbRepository,
    private userDbRepository: UserRepository,
    private imageDbRepository: ImageDbRepository
  ) {}

  async run(
    id: string,
    idUser: string,
    content?: string,
    imageFile?: Buffer | undefined,

    date?: Date
  ): Promise<void> {
    const existingPublication = await this.publicationDbRepository.findById(
      new PublicationId(id)
    );
    if (!existingPublication)
      throw new PublicationError("Publication not found");

    const existingUser = await this.userDbRepository.findById(
      new UserId(idUser)
    );
    if (!existingUser) throw new PublicationError("User not found");

    // Usa los valores existentes si no se proporcionan nuevos
    const updatedContent = content
      ? new PublicationContent(content)
      : existingPublication.content;
    const updatedImageUrl = imageFile
      ? new ImageUrl(
          await new ImageUpdateApplication(
            this.publicationDbRepository,
            this.imageDbRepository
          ).run(id, imageFile)
        )
      : new ImageUrl(existingPublication.imageUrl.value);

    const updatedDate = date
      ? new PublicationDate(date)
      : existingPublication.date;

    const updatedPublication = new Publication(
      new PublicationId(id),
      new UserId(idUser),
      updatedContent,
      updatedImageUrl,
      updatedDate
    );

    return await this.publicationDbRepository.update(updatedPublication);
  }
}
