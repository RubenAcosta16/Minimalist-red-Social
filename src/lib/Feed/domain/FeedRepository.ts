import { Publication } from "../../Publication/domain/Publication";


export interface FeedDbRepository {

  findFeed(): Promise<Publication[]>;
}
 