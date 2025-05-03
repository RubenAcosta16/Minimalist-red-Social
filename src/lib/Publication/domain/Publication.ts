import { ImageUrl } from "../../Image/domain/props/ImageUrl";
import { UserId } from "../../User/domain/Props/UserId";
import { PublicationDate } from "./props/PublicationDate";
import { PublicationId } from "./props/PublicationId";
import { PublicationContent } from "./props/PublicationsContent";

export class Publication {
  id: PublicationId;
  idUser: UserId;
  content: PublicationContent;
  imageUrl: ImageUrl;
  date: PublicationDate;

  constructor(
    id: PublicationId,
    idUser: UserId,
    content: PublicationContent,
    imageUrl: ImageUrl,
    date: PublicationDate
  ) {
    this.id = id;
    this.idUser = idUser;
    this.content = content;
    this.imageUrl = imageUrl;
    this.date = date;
  }

  public mapToPrimitives() {
    return {
      id: this.id.value,
      content: this.content.value,
      imageUrl: this.imageUrl.value,
      date: this.date.value,
    };
  }

  public mapToPrimitivesNoPassword() {
    return {
      id: this.id.value,
      content: this.content.value,
      imageUrl: this.imageUrl.value,
      date: this.date.value,
    };
  }
}
