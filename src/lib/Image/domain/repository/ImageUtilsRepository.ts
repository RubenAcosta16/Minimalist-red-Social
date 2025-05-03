export interface ImageUtilsRepository {
  uploadImage(file: Buffer): Promise<{ url: string; publicId: string }>;
}
