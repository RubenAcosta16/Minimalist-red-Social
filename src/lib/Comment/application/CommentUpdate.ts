import { PublicationNotFoundError } from "../../Publication/domain/errors";
import { PublicationId } from "../../Publication/domain/props/PublicationId";
import { PublicationDbRepository } from "../../Publication/domain/PublicationRepository";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { Comment } from "../domain/Comment";
import { CommentDbRepository } from "../domain/CommentRepository";
import { CommentError, CommentNotFoundError } from "../domain/errors";
import { CommentId } from "../domain/props/Comment";
import { CommentContent } from "../domain/props/CommentContent";

export class CommentUpdate {
  constructor(
    private commentRepository: CommentDbRepository,
    private userRepository: UserRepository,
    private publicationRepository: PublicationDbRepository
  ) {}

  async run(
    id: string,
    idUsuario: string,
    idPublication: string,
    content?: string
    // date
  ): Promise<void> {
    const commentFound = await this.commentRepository.findById(
      new CommentId(id)
    );
    if (!commentFound) throw new CommentError("Id doesn't exists");

    const userFound = await this.userRepository.findById(new UserId(idUsuario));
    if (!userFound) throw new CommentNotFoundError("User not found");

    const publicationFound = await this.publicationRepository.findById(
      new PublicationId(idPublication)
    );
    if (!publicationFound)
      throw new PublicationNotFoundError("Publication not found");

    const updatedContent = content
      ? new CommentContent(content)
      : commentFound.content;

    const comment = new Comment(
      new CommentId(id),
      new PublicationId(idPublication),
      new UserId(idUsuario),
      updatedContent,
      commentFound.date
    );

    return await this.commentRepository.update(comment);
  }
}
