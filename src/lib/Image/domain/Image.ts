import { ImageId } from "./props/ImageId";
import { ImageUrl } from "./props/ImageUrl";

export class Image {
  // esto es temporal
  id: ImageId;
  url: ImageUrl;

  constructor(id: ImageId, url: ImageUrl) {
    this.id = id;
    this.url = url;
  }
}
