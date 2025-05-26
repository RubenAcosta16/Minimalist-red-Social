import { UserId } from "../../User/domain/Props/UserId";
import { Follow } from "../domain/Follow";
import { FollowDbRepository } from "../domain/FollowRepository";
import { FollowId } from "../domain/props/FollowId";

export class InMemoryFollowRepository implements FollowDbRepository {
  private follow: Follow[] = [];

  findUsersYouFollow(id: UserId): Promise<Follow[] | null> {
    return Promise.resolve(
      this.follow.filter(
        (follow) => follow.idUserFollower.value === id.value
      ) || null
    );
  }

  findUserYouFollow(
    idUserToFollow: string,
    idUserFollower: string
  ): Promise<Follow | null> {
    return Promise.resolve(
      this.follow.find(
        (follow) =>
          follow.idUserFollower.value === idUserFollower &&
          follow.idUserToFollow.value === idUserToFollow
      ) || null
    );
  }

  findUsersFollowYou(id: UserId): Promise<Follow[] | null> {
    return Promise.resolve(
      this.follow.filter(
        (follow) => follow.idUserToFollow.value === id.value
      ) || null
    );
  }

  async create(follow: Follow): Promise<void> {
    this.follow.push(follow);
  }

  async findById(id: FollowId): Promise<Follow | null> {
    return this.follow.find((follow) => follow.id.value === id.value) || null;
  }

  async delete(id: FollowId): Promise<void> {
    this.follow = this.follow.filter((follow) => follow.id.value !== id.value);
  }
}
