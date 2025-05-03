import { ImageError } from "../domain/errors";
import { Image } from "../domain/Image";
import { ImageDbRepository } from "../domain/repository/ImageDbRepository";
import { ImageId } from "../domain/props/ImageId";
import { ImageUrl } from "../domain/props/ImageUrl";
import { ImageUtilsRepository } from "../domain/repository/ImageUtilsRepository";

export class ImageUpload {
  constructor(
    private imageDbbRepository: ImageDbRepository,
    private imageUtilsRepository: ImageUtilsRepository
  ) {}

  async run(file: Buffer): Promise<string> {
    const image = await this.imageUtilsRepository.uploadImage(file);
    if (!image) throw new ImageError("Image upload failed");

    // const id = this.repository.generateId();

    const imageObject = new Image(
      new ImageId(image.publicId),
      new ImageUrl(image.url)
    );

    await this.imageDbbRepository.imageCreateObject(imageObject);

    return image.url;
  }
}
