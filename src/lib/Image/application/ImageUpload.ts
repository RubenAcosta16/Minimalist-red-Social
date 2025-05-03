import { ImageError } from "../domain/errors";
import { Image } from "../domain/Image";
import { ImageDbRepository } from "../domain/ImageDbRepository";
import { ImageId } from "../domain/props/ImageId";
import { ImageUrl } from "../domain/props/ImageUrl";

export class ImageUpload {
  constructor(private dbRepository: ImageDbRepository) {}

  async run(file: Buffer): Promise<string> {
    const image = await this.dbRepository.uploadImage(file);
    if (!image) throw new ImageError("Image upload failed");

    // const id = this.repository.generateId();

    const imageObject = new Image(
      new ImageId(image.publicId),
      new ImageUrl(image.url)
    );

    await this.dbRepository.imageCreateObject(imageObject);

    return image.url;
  }
}
