import { ImageDbRepository } from "../../Image/domain/repository/ImageDbRepository";
import { ImageUrl } from "../../Image/domain/props/ImageUrl";
import { ImageUploadApplication } from "../../shared/application/Image/ImageUploadApplication";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { PublicationError } from "../domain/errors";
import { PublicationDate } from "../domain/props/PublicationDate";
import { PublicationId } from "../domain/props/PublicationId";
import { PublicationContent } from "../domain/props/PublicationsContent";
import { Publication } from "../domain/Publication";
import { PublicationDbRepository } from "../domain/PublicationRepository";
import { ImageUtilsRepository } from "../../Image/domain/repository/ImageUtilsRepository";
import { generateId } from "../../shared/infraestructure/generateId";

export class PublicationCreate {
  constructor(
    private publicationDbRepository: PublicationDbRepository,
    private userDbRepository: UserRepository,
    private imageDbRepository: ImageDbRepository,
    private imageUtilsRepository: ImageUtilsRepository
  ) {}

  async run(
    // id: string,
    idUser: string,
    content: string,
    imageFile: Buffer | undefined
  ): Promise<void> {
    const id = generateId();

    const imageApplication = new ImageUploadApplication(
      this.imageDbRepository,
      this.imageUtilsRepository
    );

    const FoundId = await this.publicationDbRepository.findById(
      new PublicationId(id)
    );
    if (FoundId) throw new PublicationError("Id already exists");

    const FoundUser = await this.userDbRepository.findById(new UserId(idUser));
    if (!FoundUser) throw new PublicationError("User Not Found");

    const imageUrl: string = await imageApplication.run(imageFile);

    const date: Date = new Date(Date.now());

    const newPublication = new Publication(
      new PublicationId(id),
      new UserId(idUser),
      new PublicationContent(content),
      new ImageUrl(imageUrl),
      new PublicationDate(date)
    );

    return await this.publicationDbRepository.create(newPublication);
  }
}
