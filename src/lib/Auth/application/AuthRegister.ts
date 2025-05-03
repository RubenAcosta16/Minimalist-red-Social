import { AuthRepository } from "../domain/AuthRepository";
import { UserCreate } from "../../User/application/UserCreate";

import { UserRepository } from "../../User/domain/UserRepository";
import { ImageDbRepository } from "../../Image/domain/ImageDbRepository";

// type combinedImageRepository =ImageDbRepository & ImageRepository

export class AuthRegister {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private imageDbRepository: ImageDbRepository
  ) {}

  async run(
    // id: string,
    name: string,
    email: string,
    password: string,
    imageFile: Buffer | undefined
    // userAuthenticatedRole: UserImageUrl
  ): Promise<void> {
    // const imageApplication = new ImageUploadApplication(
    //   this.imageDbRepository,
    // );
    const userApplication = new UserCreate(
      this.userRepository,
      this.imageDbRepository
    );

    // const imageUrl = await imageApplication.run(imageFile);

    const id = this.authRepository.generateId();
    const hashedPassword = await this.authRepository.hashPassword(password);

    return await userApplication.run(
      id,
      name,
      email,
      hashedPassword,
      imageFile
    );
  }
}
