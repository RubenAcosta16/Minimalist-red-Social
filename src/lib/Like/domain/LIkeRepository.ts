import { CommentId } from "../../Comment/domain/props/CommentId";
import { PublicationId } from "../../Publication/domain/props/PublicationId";
import { UserId } from "../../User/domain/Props/UserId";
import { Like } from "./Like";
import { LikeId } from "./props/LikeId";
import { LikeType } from "./props/LikeType";

export interface LikeDbRepository {
  findById(id: LikeId, type: LikeType): Promise<Like | null>;
  findByUserId(userId: UserId, type: LikeType): Promise<Like[]>;
  findByPubOrCommId(
    pubOrCommId: PublicationId | CommentId,
    type: LikeType
  ): Promise<Like[]>;

  create(like: Like): Promise<void>;
  delete(id: LikeId): Promise<void>;
}
 