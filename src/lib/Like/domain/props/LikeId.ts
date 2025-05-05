import { LikeError } from "../errors";

export class LikeId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new LikeError("Like id is not valid");
    }
  }
}
