import { UserId } from "../../User/domain/Props/UserId";
import { FollowId } from "./props/FollowId";

export class Follow {
  id: FollowId;
  idUserToFollow: UserId;
  idUserFollower: UserId;

  constructor(id: FollowId, idUserToFollow: UserId, idUserFollower: UserId) {
    this.id = id;
    this.idUserToFollow = idUserToFollow;
    this.idUserFollower = idUserFollower;
  }
 
  public mapToPrimitives() {
    return {
      id: this.id.value,
      idUserToFollow: this.idUserToFollow.value,
      idUserFollower: this.idUserFollower.value,
    };
  }
}
