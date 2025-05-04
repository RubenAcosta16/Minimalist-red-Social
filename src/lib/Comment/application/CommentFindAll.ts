import { Comment } from "../domain/Comment";
import { CommentDbRepository } from "../domain/CommentRepository";

export class CommentFindAll {
  constructor(private commentRepository: CommentDbRepository) {}

  async run(): Promise<Comment[]> {
    return await this.commentRepository.findAll();
  }
}
