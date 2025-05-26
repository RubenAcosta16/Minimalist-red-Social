import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { CommentDbRepository } from "../domain/CommentRepository";
import { CommentError, CommentNotFoundError } from "../domain/errors";
import { CommentId } from "../domain/props/CommentId";

export class CommentDelete {
  constructor(
    private commentRepository: CommentDbRepository,
    private userDbRepository: UserRepository
  ) {}

  async run(id: string, idUser: string): Promise<void> {
    const comment = await this.commentRepository.findById(new CommentId(id));
    if (!comment) throw new CommentNotFoundError("Comment Not Found");

    const FoundUser = await this.userDbRepository.findById(new UserId(idUser));
    if (!FoundUser) throw new CommentError("User Not Found");

    if (comment.idUser.value !== idUser)
      throw new CommentError("You are not the owner of this comment");

    await this.commentRepository.delete(new CommentId(id));
  }
}
