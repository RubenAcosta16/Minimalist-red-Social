import { FindById } from "../../shared/domain/FindByIdRepository";
import { PublicationNotFoundError } from "../domain/errors";
import { PublicationId } from "../domain/props/PublicationId";
import { Publication } from "../domain/Publication";
import { PublicationDbRepository } from "../domain/PublicationRepository";

export class PublicationFindById implements FindById{
  constructor(private repository: PublicationDbRepository) {}

  async run(id: string): Promise<Publication> {
    const publication = await this.repository.findById(new PublicationId(id));

    if (!publication) throw new PublicationNotFoundError("Publication Not Found");

    return publication;
  }
}
