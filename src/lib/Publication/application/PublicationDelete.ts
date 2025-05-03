import { ImageDelete } from "../../Image/application/ImageDelete";
import { ImageDbRepository } from "../../Image/domain/ImageDbRepository";
import { PublicationNotFoundError } from "../domain/errors";
import { PublicationId } from "../domain/props/PublicationId";
import { PublicationDbRepository } from "../domain/PublicationRepository";

export class PublicationDelete {
  constructor(
    private repository: PublicationDbRepository,
    private imageDbRepository: ImageDbRepository
  ) {}

  async run(id: string): Promise<void> {
    const publication = await this.repository.findById(new PublicationId(id));
    if (!publication) throw new PublicationNotFoundError("User Not Found");

    new ImageDelete(this.imageDbRepository).run(publication.imageUrl.value);

    await this.repository.delete(new PublicationId(id));
  }
}
