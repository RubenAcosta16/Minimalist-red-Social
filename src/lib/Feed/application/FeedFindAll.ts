import { Publication } from "../../Publication/domain/Publication";
import { PublicationDbRepository } from "../../Publication/domain/PublicationRepository";

export class FeedFindAll {
  constructor(private repository: PublicationDbRepository) {}

  async run(): Promise<Publication[]> {
    // i dont wanna make this harder, so i only will return 10 publications lets gooooooo
    // i think i should make a pagination, but i dont know
    return await this.repository.findAll(10);
  }
}
