import { FollowError } from "../errors";

export class FollowId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new FollowError("Follow id is not valid");
    }
  }
}
