import { CommentId } from "../../Comment/domain/props/CommentId";
import { PublicationId } from "../../Publication/domain/props/PublicationId";
import { UserId } from "../../User/domain/Props/UserId";
import { LikeDbRepository } from "../domain/FollowRepository";
import { Like } from "../domain/Like";
import { LikeId } from "../domain/props/LikeId";
import { LikeType } from "../domain/props/LikeType";

export class InMemoryLikeRepository implements LikeDbRepository {
  private images: Like[] = [];

  findById(id: LikeId, type: LikeType): Promise<Like | null> {
    const like = this.images.find(
      (like) => like.id.value === id.value && like.type === type
    );
    return Promise.resolve(like || null);
  }
  findByUserId(userId: UserId, type: LikeType): Promise<Like[]> {
    const likes = this.images.filter(
      (like) => like.idUser.value === userId.value && like.type === type
    );
    return Promise.resolve(likes || []);
  }
  findByPubOrCommId(
    pubOrCommId: PublicationId | CommentId,
    type: LikeType
  ): Promise<Like[]> {
    const likes = this.images.filter(
      (like) =>
        like.idPubOrComm.value === pubOrCommId.value && like.type === type
    );
    return Promise.resolve(likes || []);
  }
  create(like: Like): Promise<void> {
    this.images.push(like);
    return Promise.resolve();
  }
  delete(id: LikeId): Promise<void> {
    this.images = this.images.filter((like) => like.id.value !== id.value);
    return Promise.resolve();
  }
}
