import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { FollowError, FollowNotFoundError } from "../domain/errors";
import { FollowDbRepository } from "../domain/FollowRepository";
import { FollowId } from "../domain/props/FollowId";

export class FollowDelete {
  constructor(
    private followRepository: FollowDbRepository,
    private userDbRepository: UserRepository
  ) {}

  async run(idUserToFollow: string, idUserFollower: string): Promise<void> {
    const followFound = await this.followRepository.findById(new FollowId(idUserToFollow));
    if (!followFound) throw new FollowNotFoundError("Comment Not Found");

    const FoundUser = await this.userDbRepository.findById(new UserId(idUserFollower));
    if (!FoundUser) throw new FollowError("User Not Found");

    if (followFound.idUserFollower.value !== idUserFollower)
      throw new FollowError("You are not the owner of this follow");

    await this.followRepository.delete(new FollowId(idUserToFollow));
  }
}
