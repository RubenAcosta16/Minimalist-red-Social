import { CommentDbRepository } from "../../Comment/domain/CommentRepository";
import { CommentId } from "../../Comment/domain/props/CommentId";
import { PublicationId } from "../../Publication/domain/props/PublicationId";
import { PublicationDbRepository } from "../../Publication/domain/PublicationRepository";
import { LikeNotFoundError } from "../domain/errors";
import { LikeDbRepository } from "../domain/LIkeRepository";
import { Like } from "../domain/Like";
import { LikeType } from "../domain/props/LikeType";

export class LikeFindByPubOrComm {
  constructor(
    private likeRepository: LikeDbRepository,
    private commentRepository: CommentDbRepository,
    private publicationRepository: PublicationDbRepository
  ) {}

  async run(idPubOrComm: string, type: string): Promise<Like[]> {
    let like: Like[];
    if (new LikeType(type).value === "publication") {
      const publicationFound = await this.publicationRepository.findById(
        new PublicationId(idPubOrComm)
      );
      if (!publicationFound)
        throw new LikeNotFoundError("Publication not found");

      like = await this.likeRepository.findByPubOrCommId(
        new PublicationId(idPubOrComm),
        new LikeType(type)
      );
    } else {
      const commentFound = await this.commentRepository.findById(
        new CommentId(idPubOrComm)
      );
      if (!commentFound) throw new LikeNotFoundError("Comment not found");

      like = await this.likeRepository.findByPubOrCommId(
        new CommentId(idPubOrComm),
        new LikeType(type)
      );
    }

    if (!like) throw new LikeNotFoundError("Like Not Found");

    return like;
  }
}
