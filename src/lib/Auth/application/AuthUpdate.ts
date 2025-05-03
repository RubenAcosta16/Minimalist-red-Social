import { AuthRepository } from "../domain/AuthRepository";
import { UserName } from "../../User/domain/Props/UserName";
import { UserEmail } from "../../User/domain/Props/UserEmail";
import { UserPassword } from "../../User/domain/Props/UserPassword";
import { UserUpdate } from "../../User/application/UserUpdate";
import { ImageDbRepository } from "../../Image/domain/ImageDbRepository";
import { UserFindById } from "../../User/application/UserfindById";
import { UserRepository } from "../../User/domain/UserRepository";

export class AuthUpdate {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private imageDbRepository: ImageDbRepository
  ) {}

  async run(
    id: string,
    name?: string,
    email?: string,
    password?: string,
    imageFile?: Buffer | undefined
  ): Promise<void> {
    const userUpdateApplication = new UserUpdate(
      this.userRepository,
      this.imageDbRepository
    );
    const userFindByIdApplication = new UserFindById(this.userRepository);
    const existingUser = await userFindByIdApplication.run(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedName = name ? new UserName(name) : existingUser.name;
    const updatedEmail = email ? new UserEmail(email) : existingUser.email;
    const updatedPassword = password
      ? new UserPassword(await this.authRepository.hashPassword(password))
      : existingUser.password;

    return await userUpdateApplication.run(
      id,
      updatedEmail.value,
      updatedName.value,
      updatedPassword.value,
      imageFile
    );
  }
}
