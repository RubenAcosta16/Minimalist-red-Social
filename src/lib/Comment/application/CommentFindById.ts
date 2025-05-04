import { Comment } from "../domain/Comment";
import { CommentDbRepository } from "../domain/CommentRepository";
import { CommentNotFoundError } from "../domain/errors";
import { CommentId } from "../domain/props/CommentId";

export class CommentFindById {
  constructor(private commentRepository: CommentDbRepository) {}

  async run(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findById(new CommentId(id));

    if (!comment) throw new CommentNotFoundError("Comment Not Found");

    return comment;
  }
}
