import { PublicationError } from "../errors";

export class PublicationId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new PublicationError("Publication id is not valid");
    }
  }
}
