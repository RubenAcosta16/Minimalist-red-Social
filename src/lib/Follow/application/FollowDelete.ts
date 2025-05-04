import { FollowNotFoundError } from "../domain/errors";
import { FollowDbRepository } from "../domain/FollowRepository";
import { FollowId } from "../domain/props/FollowId";

export class FollowDelete {
  constructor(private followRepository: FollowDbRepository) {}

  async run(id: string): Promise<void> {
    const followFound = await this.followRepository.findById(new FollowId(id));
    if (!followFound) throw new FollowNotFoundError("Comment Not Found");

    await this.followRepository.delete(new FollowId(id));
  }
}
