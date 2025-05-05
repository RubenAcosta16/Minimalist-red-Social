import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { LikeNotFoundError } from "../domain/errors";
import { LikeDbRepository } from "../domain/FollowRepository";
import { Like } from "../domain/Like";
import { LikeType } from "../domain/props/LikeType";

export class LikeFindByUserId {
  constructor(
    private likeRepository: LikeDbRepository,
    private userRepository: UserRepository
  ) {}

  async run(userId: string, type: string): Promise<Like[]> {
    const userFound = await this.userRepository.findById(new UserId(userId));
    if (!userFound) throw new LikeNotFoundError("User not found");

    const like = await this.likeRepository.findByUserId(
      new UserId(userId),
      new LikeType(type)
    );

    if (!like) throw new LikeNotFoundError("Like Not Found");

    return like;
  }
}
