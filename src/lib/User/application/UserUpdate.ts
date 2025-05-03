import { ImageDbRepository } from "../../Image/domain/ImageDbRepository";
import { ImageUrl } from "../../Image/domain/props/ImageUrl";
import { ImageUpdateApplication } from "../../shared/application/Image/ImageUpdateApplications";
import { UserEmail } from "../domain/Props/UserEmail";
import { UserId } from "../domain/Props/UserId";
import { UserName } from "../domain/Props/UserName";
import { UserPassword } from "../domain/Props/UserPassword";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserError, UserNotFoundError } from "../domain/errors";

export class UserUpdate {
  constructor(
    private repository: UserRepository,
    private imageDbRepository: ImageDbRepository
  ) {}

  async run(
    id: string,
    email: string,
    name?: string,
    password?: string,
    imageFile?: Buffer | undefined
  ): Promise<void> {
    const foundUser = await this.repository.findById(new UserId(id));
    if (!foundUser) throw new UserNotFoundError("User Not Found");

    const UserFoundEmail = await this.repository.findByEmail(
      new UserEmail(email)
    );

    if (UserFoundEmail && UserFoundEmail.id.value !== id) {
      throw new UserError("Email already exists");
    }

    // Usa los valores existentes si no se proporcionan nuevos
    const updatedName = name ? new UserName(name) : foundUser.name;
    const updatedPassword = password
      ? new UserPassword(password)
      : foundUser.password;

    const updatedImageUrl = imageFile
      ? new ImageUrl(
          await new ImageUpdateApplication(
            this.repository,
            this.imageDbRepository
          ).run(id, imageFile)
        )
      : new ImageUrl(foundUser.imageUrl.value);

    const user = new User(
      foundUser.id,
      updatedName,
      foundUser.email, 
      updatedPassword,
      updatedImageUrl
    );

    return await this.repository.update(user);
  }
}
