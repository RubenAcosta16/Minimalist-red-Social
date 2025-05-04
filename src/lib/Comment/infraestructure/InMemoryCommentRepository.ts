import { Comment } from "../domain/Comment";
import { CommentDbRepository } from "../domain/CommentRepository";
import { CommentId } from "../domain/props/Comment";

export class InMemoryCommentRepository implements CommentDbRepository {
  private comment: Comment[] = [];

  async create(comment: Comment): Promise<void> {
    this.comment.push(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.comment;
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
