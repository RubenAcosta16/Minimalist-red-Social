import { CommentDbRepository } from "../domain/CommentRepository";
import { CommentNotFoundError } from "../domain/errors";
import { CommentId } from "../domain/props/CommentId";

export class CommentDelete {
  constructor(private commentRepository: CommentDbRepository) {}

  async run(id: string): Promise<void> {
    const comment = await this.commentRepository.findById(new CommentId(id));
    if (!comment) throw new CommentNotFoundError("Comment Not Found");

    await this.commentRepository.delete(new CommentId(id));
  }
}
