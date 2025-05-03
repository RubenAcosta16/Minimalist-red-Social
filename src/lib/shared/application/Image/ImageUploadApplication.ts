// type combinedImageRepository =ImageDbRepository & ImageRepository

import { ImageUpload } from "../../../Image/application/ImageUpload";
import { ImageDbRepository } from "../../../Image/domain/ImageDbRepository";

export class ImageUploadApplication {
  constructor(
    // private userRepository: UserRepository,
    private imageDbRepository: ImageDbRepository
  ) {}

  async run(
    imageFile: Buffer | undefined
    // userAuthenticatedRole: UserImageUrl
  ): Promise<string> {
    const imageApplication = new ImageUpload(this.imageDbRepository);
    // const userApplication = new UserCreate(this.userRepository);

    let imageUrl: string = "";

    if (imageFile) {
      imageUrl = await imageApplication.run(imageFile);
    }

    return imageUrl;
  }
}
