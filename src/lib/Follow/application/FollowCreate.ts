import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { FollowError, FollowNotFoundError } from "../domain/errors";
import { Follow } from "../domain/Follow";
import { FollowDbRepository } from "../domain/FollowRepository";
import { FollowId } from "../domain/props/FollowId";

export class FollowCreate {
  constructor(
    private followRepository: FollowDbRepository,
    private userRepository: UserRepository
  ) {}

  async run(
    id: string,
    idUserToFollow: string,
    idUserFollower: string
  ): Promise<void> {
    const followFound = await this.followRepository.findById(new FollowId(id));
    if (!followFound) throw new FollowError("Follow already exists");

    const userToFollowFound = await this.userRepository.findById(
      new UserId(idUserToFollow)
    );
    if (!userToFollowFound) throw new FollowNotFoundError("User not found");

    const userToFollwer = await this.userRepository.findById(
      new UserId(idUserFollower)
    );
    if (!userToFollwer) throw new FollowNotFoundError("User not found");

    const comment = new Follow(
      new FollowId(id),
      new UserId(idUserToFollow),
      new UserId(idUserFollower)
    );

    return await this.followRepository.create(comment);
  }
}
