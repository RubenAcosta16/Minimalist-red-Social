import { Publication } from "../domain/Publication";
import { PublicationDbRepository } from "../domain/PublicationRepository";

export class PublicationFindAll {
  constructor(private repository: PublicationDbRepository) {}

  async run(): Promise<Publication[]> {
    return await this.repository.findAll(null);
  }
}
