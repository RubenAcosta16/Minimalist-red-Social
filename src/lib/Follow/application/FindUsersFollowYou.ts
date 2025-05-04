import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { FollowNotFoundError } from "../domain/errors";
import { Follow } from "../domain/Follow";
import { FollowDbRepository } from "../domain/FollowRepository";

export class FindUsersFollowYou {
  constructor(
    private followRepository: FollowDbRepository,
    private userRepository: UserRepository
  ) {}

  async run(idUser: string): Promise<Follow[]> {
    const userFound = await this.userRepository.findById(new UserId(idUser));
    if (!userFound) throw new FollowNotFoundError("User not found");

    const follow = await this.followRepository.findUsersFollowYou(
      new UserId(idUser)
    );

    if (!follow) throw new FollowNotFoundError("User Not Found");

    return follow;
  }
}
