import { ImageDbRepository } from "../../Image/domain/repository/ImageDbRepository";
import { ImageUrl } from "../../Image/domain/props/ImageUrl";
import { ImageUploadApplication } from "../../shared/application/Image/ImageUploadApplication";
import { UserEmail } from "../domain/Props/UserEmail";
import { UserId } from "../domain/Props/UserId";
import { UserName } from "../domain/Props/UserName";
import { UserPassword } from "../domain/Props/UserPassword";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserError } from "../domain/errors";
import { ImageUtilsRepository } from "../../Image/domain/repository/ImageUtilsRepository";
import { generateId } from "../../shared/infraestructure/generateId";

export class UserCreate {
  constructor(
    private repository: UserRepository,
    private imageDbRepository: ImageDbRepository,
    private imageUtilsRepository: ImageUtilsRepository
  ) {}

  async run(
    // id: string,
    name: string,
    email: string,
    password: string,
    imageFile: Buffer | undefined
  ): Promise<void> {
    const FoundEmail = await this.repository.findByEmail(new UserEmail(email));
    if (FoundEmail) throw new UserError("Email already exists");

    const id = generateId();

    const FoundId = await this.repository.findById(new UserId(id));
    if (FoundId) throw new UserError("Id already exists");

    const imageApplication = new ImageUploadApplication(
      this.imageDbRepository,
      this.imageUtilsRepository
    );

    const imageUrl: string = await imageApplication.run(imageFile);

    const user = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword(password),
      new ImageUrl(imageUrl)
    );

    return await this.repository.create(user);
  }
}
