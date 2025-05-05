import { LikeError } from "../errors";

export class LikeType {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new LikeError("Like type is not valid");
    }

    if (this.value !== "comment" && this.value !== "publication") {
      throw new LikeError("Like type is not valid");
    }
  }
}
