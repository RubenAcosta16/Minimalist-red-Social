import { CommentError } from "../errors";

export class CommentContent {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new CommentError("Comment content is not valid");
    }

    if (this.value.length >= 127) {
      throw new CommentError("Comment content is too long");
    }
  }
}
