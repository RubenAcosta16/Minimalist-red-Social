import { Image } from "./Image";

export interface ImageDbRepository {
  // si tienen application
  deleteImage(id: string): Promise<void>;
  uploadImage(file: Buffer): Promise<{ url: string; publicId: string }>;

  getImage(imageUrl: string): Promise<Image | null>;
  imageCreateObject(image: Image): Promise<void>;
}
  