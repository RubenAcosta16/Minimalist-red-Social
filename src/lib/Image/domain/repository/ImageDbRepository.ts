import { Image } from "../Image";


export interface ImageDbRepository {
  // si tienen application
  deleteImage(id: string): Promise<void>;

  getImage(imageUrl: string): Promise<Image | null>;
  imageCreateObject(image: Image): Promise<void>;
}
  