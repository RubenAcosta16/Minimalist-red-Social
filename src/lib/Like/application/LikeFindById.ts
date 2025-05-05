import { LikeNotFoundError } from "../domain/errors";
import { LikeDbRepository } from "../domain/FollowRepository";
import { Like } from "../domain/Like";
import { LikeId } from "../domain/props/LikeId";
import { LikeType } from "../domain/props/LikeType";

export class LikeFindById {
  constructor(private followRepository: LikeDbRepository) {}

  async run(id: string, type: string): Promise<Like> {
    const follow = await this.followRepository.findById(
      new LikeId(id),
      new LikeType(type)
    );

    if (!follow) throw new LikeNotFoundError("Like Not Found");

    return follow;
  }
}
