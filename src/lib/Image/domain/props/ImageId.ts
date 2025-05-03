import { ImageError } from "../errors";

export class ImageId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new ImageError("Image id is not valid");
    }
  }
}
