import { CommentId } from "../../Comment/domain/props/CommentId";
import { PublicationId } from "../../Publication/domain/props/PublicationId";
import { UserId } from "../../User/domain/Props/UserId";
import { LikeId } from "./props/LikeId";
import { LikeType } from "./props/LikeType";

export class Like {
  id: LikeId;
  idUser: UserId;
  idPubOrComm: PublicationId | CommentId;
  type: LikeType;

  constructor(
    id: LikeId,
    idUser: UserId,
    idPubOrComm: PublicationId | CommentId,
    type: LikeType
  ) {
    this.type = type;
    this.id = id;
    this.idUser = idUser;
    this.idPubOrComm = idPubOrComm;
  }

  public mapToPrimitives() {
    return {
      id: this.id.value,
      idUser: this.idUser.value,
      idPubOrComm: this.idPubOrComm.value,
      type: this.type,
    };
  }
}
