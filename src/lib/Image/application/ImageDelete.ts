import { ImageError } from "../domain/errors";

import { ImageDbRepository } from "../domain/repository/ImageDbRepository";

export class ImageDelete {
  constructor(private dbRepository: ImageDbRepository) {}

  async run(imageUrl: string): Promise<void> {
    if (!imageUrl) throw new ImageError("Image URL is required");

    const imageFound = await this.dbRepository.getImage(imageUrl);
    if (!imageFound) throw new ImageError("Image doesn't exists");

    return await this.dbRepository.deleteImage(imageFound.id.value);
  }
}
