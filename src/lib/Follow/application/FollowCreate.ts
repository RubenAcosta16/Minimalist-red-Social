import { generateId } from "../../shared/infraestructure/generateId";
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
    // id: string,
    idUserToFollow: string,
    idUserFollower: string
  ): Promise<void> {
    if (idUserToFollow === idUserFollower)
      throw new FollowError("You cannot follow yourself");

    const isFollowed = await this.followRepository.findUserYouFollow(
      idUserToFollow,
      idUserFollower
    );
    if(isFollowed) throw new FollowError("You are following the user");

    const id = generateId();

    const followFound = await this.followRepository.findById(new FollowId(id));
    if (followFound) throw new FollowError("Follow already exists");

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
