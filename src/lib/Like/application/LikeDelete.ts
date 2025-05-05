import { LikeNotFoundError } from "../domain/errors";
import { LikeDbRepository } from "../domain/FollowRepository";
import { LikeId } from "../domain/props/LikeId";
import { LikeType } from "../domain/props/LikeType";

export class LikeDelete {
  constructor(private likeRepository: LikeDbRepository) {}

  async run(id: string, type: string): Promise<void> {
    const followFound = await this.likeRepository.findById(
      new LikeId(id),
      new LikeType(type)
    );
    if (!followFound) throw new LikeNotFoundError("Like Not Found");

    await this.likeRepository.delete(new LikeId(id));
  }
}
