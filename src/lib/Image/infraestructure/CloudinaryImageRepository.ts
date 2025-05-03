import { ImageUtilsRepository } from "../domain/repository/ImageUtilsRepository";
import cloudinary from "./cloudinary/config";

export class CloudinaryImageRepository implements ImageUtilsRepository {
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
