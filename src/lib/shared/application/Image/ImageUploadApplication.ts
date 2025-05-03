// type combinedImageRepository =ImageDbRepository & ImageRepository

import { ImageUpload } from "../../../Image/application/ImageUpload";
import { ImageDbRepository } from "../../../Image/domain/repository/ImageDbRepository";
import { ImageUtilsRepository } from "../../../Image/domain/repository/ImageUtilsRepository";

export class ImageUploadApplication {
  constructor(
    // private userRepository: UserRepository,
    private imageDbRepository: ImageDbRepository,
    private imageUtilsRepository: ImageUtilsRepository
  ) {}

  async run(
    imageFile: Buffer | undefined
    // userAuthenticatedRole: UserImageUrl
  ): Promise<string> {
    const imageApplication = new ImageUpload(
      this.imageDbRepository,
      this.imageUtilsRepository
    );
    // const userApplication = new UserCreate(this.userRepository);

    let imageUrl: string = "";

    if (imageFile) {
      imageUrl = await imageApplication.run(imageFile);
    }

    return imageUrl;
  }
}
