import { Comment } from "../domain/Comment";
import { CommentDbRepository } from "../domain/CommentRepository";

export class CommentFindAll {
  constructor(private commentRepository: CommentDbRepository) {}

  async run(idPublicationFrom: string, page: string): Promise<Comment[]> {
    return await this.commentRepository.findAll(
      idPublicationFrom,
      Number(page)
    );
  }
}
