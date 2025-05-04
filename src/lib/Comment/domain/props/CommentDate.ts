import { CommentError } from "../errors";

export class CommentDate {
  value: Date;

  constructor(value: Date) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new CommentError("Comment id is not valid");
    }

    if (this.value.getTime() >= Date.now()) {
      throw new CommentError("Comment id is in the future");
    }
  }
}
