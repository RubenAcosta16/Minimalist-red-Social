import { AuthRepository } from "../domain/AuthRepository";
import { UserCreate } from "../../User/application/UserCreate";

import { UserRepository } from "../../User/domain/UserRepository";
import { ImageDbRepository } from "../../Image/domain/repository/ImageDbRepository";
import { ImageUtilsRepository } from "../../Image/domain/repository/ImageUtilsRepository";

// type combinedImageRepository =ImageDbRepository & ImageRepository

export class AuthRegister {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private imageDbRepository: ImageDbRepository,
    private imageUtilsRepository: ImageUtilsRepository
  ) {}

  async run(
    // id: string,
    name: string,
    email: string,
    password: string,
    imageFile: Buffer | undefined
    // userAuthenticatedRole: UserImageUrl
  ): Promise<void> {
    const userApplication = new UserCreate(
      this.userRepository,
      this.imageDbRepository,
      this.imageUtilsRepository
    );

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
