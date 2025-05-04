import { FollowNotFoundError } from "../domain/errors";
import { Follow } from "../domain/Follow";
import { FollowDbRepository } from "../domain/FollowRepository";
import { FollowId } from "../domain/props/FollowId";

export class FollowFindById {
  constructor(private followRepository: FollowDbRepository) {}

  async run(id: string): Promise<Follow> {
    const follow = await this.followRepository.findById(new FollowId(id));

    if (!follow) throw new FollowNotFoundError("Follow Not Found");

    return follow;
  }
}
