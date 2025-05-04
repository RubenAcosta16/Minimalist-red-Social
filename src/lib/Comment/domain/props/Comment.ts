import { CommentError } from "../errors";


export class CommentId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new CommentError("Comment id is not valid");
    }
  }
}
