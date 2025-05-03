import { Image } from "../domain/Image";
import { ImageDbRepository } from "../domain/ImageDbRepository";
import cloudinary from "./cloudinary/config";

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

  async uploadImage(file: Buffer): Promise<{ url: string; publicId: string }> {
    const buffer = file;

    const { secure_url, public_id } = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) return reject(err);
          resolve(result as { secure_url: string; public_id: string });
        })
        .end(buffer);
    });

    return { url: secure_url, publicId: public_id };
  }
}
