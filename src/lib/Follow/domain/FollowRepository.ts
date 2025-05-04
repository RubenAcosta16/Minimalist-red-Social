import { UserId } from "../../User/domain/Props/UserId";
import { Follow } from "./Follow";
import { FollowId } from "./props/FollowId";

export interface FollowDbRepository {
  findById(id: FollowId): Promise<Follow | null>;
  findUsersYouFollow(id: UserId): Promise<Follow[] | null>;
  findUsersFollowYou(id: UserId): Promise<Follow[] | null>;

  create(comment: Follow): Promise<void>;
  delete(id: FollowId): Promise<void>;
}
