import { Comment } from "../domain/Comment";
import { CommentDbRepository } from "../domain/CommentRepository";
import { CommentId } from "../domain/props/CommentId";

export class InMemoryCommentRepository implements CommentDbRepository {
  private comment: Comment[] = [];

  async create(comment: Comment): Promise<void> {
    this.comment.push(comment);
  }

  async findAll(idPublicationFrom: string, page: number): Promise<Comment[]> {
    const limit = 10; 
    const filtered = this.comment.filter(
      (comment) => comment.idPublication.value === idPublicationFrom
    );
    const start = (page - 1) * limit;
    const end = start + limit;
    return filtered.slice(start, end);
  }

  async findById(id: CommentId): Promise<Comment | null> {
    return (
      this.comment.find((comment) => comment.id.value === id.value) || null
    );
  }

  async update(comment: Comment): Promise<void> {
    const index = this.comment.findIndex(
      (u) => u.id.value === comment.id.value
    );
    if (index !== -1) {
      this.comment[index] = comment;
    }
  }

  async delete(id: CommentId): Promise<void> {
    this.comment = this.comment.filter(
      (comment) => comment.id.value !== id.value
    );
  }
}
