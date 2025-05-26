import { Comment } from "./Comment";
import { CommentId } from "./props/CommentId";

export interface CommentDbRepository {
  findById(id: CommentId): Promise<Comment | null>;
  create(comment: Comment): Promise<void>;
  delete(id: CommentId): Promise<void>;
  findAll(idPublicationFrom:string, page:number): Promise<Comment[]>;
  update(comment: Comment): Promise<void>;
}
  