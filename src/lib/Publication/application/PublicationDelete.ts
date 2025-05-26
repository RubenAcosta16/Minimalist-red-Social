import { ImageDelete } from "../../Image/application/ImageDelete";
import { ImageDbRepository } from "../../Image/domain/repository/ImageDbRepository";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { PublicationError, PublicationNotFoundError } from "../domain/errors";
import { PublicationId } from "../domain/props/PublicationId";
import { PublicationDbRepository } from "../domain/PublicationRepository";

export class PublicationDelete {
  constructor(
    private repository: PublicationDbRepository,
    private userDbRepository: UserRepository,
    private imageDbRepository: ImageDbRepository
  ) {}

  async run(id: string, idUser: string): Promise<void> {
    const publication = await this.repository.findById(new PublicationId(id));
    if (!publication) throw new PublicationNotFoundError("User Not Found");

    const FoundUser = await this.userDbRepository.findById(new UserId(idUser));
    if (!FoundUser) throw new PublicationError("User Not Found");

    if (publication.idUser.value !== idUser)
      throw new PublicationError("You are not the owner of this publication");

    new ImageDelete(this.imageDbRepository).run(publication.imageUrl.value);

    await this.repository.delete(new PublicationId(id));
  }
}
