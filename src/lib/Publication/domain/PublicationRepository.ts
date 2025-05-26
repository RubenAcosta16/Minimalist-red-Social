import { PublicationId } from "./props/PublicationId";
import { Publication } from "./Publication";

export interface PublicationDbRepository {
  findById(id: PublicationId): Promise<Publication | null>;
  create(user: Publication): Promise<void>;
  delete(id: PublicationId): Promise<void>;
  findAll(quantity:number|null): Promise<Publication[]>;
  update(user: Publication): Promise<void>;
}
 