import { PublicationId } from "../domain/props/PublicationId";
import { Publication } from "../domain/Publication";
import { PublicationDbRepository } from "../domain/PublicationRepository";

export class InMemoryPublicationRepository implements PublicationDbRepository {
  private publications: Publication[] = [];

  async create(user: Publication): Promise<void> {
    this.publications.push(user);
  }

  async findAll(): Promise<Publication[]> {
    return this.publications;
  }

  async findById(id: PublicationId): Promise<Publication | null> {
    return this.publications.find((user) => user.id.value === id.value) || null;
  }

  async update(user: Publication): Promise<void> {
    const index = this.publications.findIndex(
      (u) => u.id.value === user.id.value
    );
    if (index !== -1) {
      this.publications[index] = user;
    }
  }

  async delete(id: PublicationId): Promise<void> {
    this.publications = this.publications.filter(
      (user) => user.id.value !== id.value
    );
  }
}
