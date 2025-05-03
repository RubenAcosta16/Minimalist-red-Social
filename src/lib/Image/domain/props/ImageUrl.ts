// import { ImageError } from "../errors";

export class ImageUrl {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    // const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;
    // if (!urlRegex.test(this.value)) {
    //   console.error(`Invalid URL provided: ${this.value}`); // Depuración
    //   throw new ImageError(`ImageUrl is not valid: ${this.value}`);
    // }
  }
}
