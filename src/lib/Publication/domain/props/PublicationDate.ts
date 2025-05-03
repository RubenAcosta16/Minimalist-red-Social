import { PublicationError } from "../errors";

export class PublicationDate {
  value: Date;

  constructor(value: Date) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new PublicationError("Publication id is not valid");
    }

    if (this.value.getTime() >= Date.now()) {
      throw new PublicationError("Publication id is in the future");
    }
  }
}
