import { PublicationId } from "../../Publication/domain/props/PublicationId";
import { UserId } from "../../User/domain/Props/UserId";
import { CommentId } from "./props/Comment";
import { CommentContent } from "./props/CommentContent";
import { CommentDate } from "./props/CommentDate";

export class Comment {
  id: CommentId;
  idPublication: PublicationId;
  idUser: UserId;
  content: CommentContent;
  date: CommentDate;

  constructor(
    id: CommentId,
    idPublication: PublicationId,
    idUser: UserId,
    content: CommentContent,
    date: CommentDate
  ) {
    this.id = id;
    this.idPublication = idPublication;
    this.idUser = idUser;
    this.content = content;
    this.date = date;
  }

  public mapToPrimitives() {
    return {
      id: this.id.value,
      idPublication: this.idPublication.value,
      idUser: this.idUser.value,
      content: this.content.value,
      date: this.date.value,
    };
  }
}
