import { Image } from "../domain/Image";
import { ImageDbRepository } from "../domain/repository/ImageDbRepository";

export class ImageInMemoryRepository implements ImageDbRepository {
  private images: Image[] = [];

  async deleteImage(id: string): Promise<void> {
    this.images = this.images.filter((image) => image.id.value !== id);
  }
  async getImage(imageUrl: string): Promise<Image | null> {
    const image = this.images.find((image) => image.url.value === imageUrl);
    return image || null;
  }
  async imageCreateObject(image: Image): Promise<void> {
    this.images.push(image);
  }


}
