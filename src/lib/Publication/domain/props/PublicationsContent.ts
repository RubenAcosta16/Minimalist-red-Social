import { PublicationError } from "../errors";

export class PublicationContent {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new PublicationError("Publication content is not valid");
    }

    if (this.value.length >= 255) {
      throw new PublicationError("Publication content is too long");
    }
  }
}
