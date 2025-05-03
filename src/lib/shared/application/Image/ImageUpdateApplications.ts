// type combinedImageRepository =ImageDbRepository & ImageRepository

import { ImageDelete } from "../../../Image/application/ImageDelete";
import { ImageUpload } from "../../../Image/application/ImageUpload";
import { ImageDbRepository } from "../../../Image/domain/ImageDbRepository";
import { PublicationFindById } from "../../../Publication/application/PublicationFindById";
import { PublicationDbRepository } from "../../../Publication/domain/PublicationRepository";
import { UserFindById } from "../../../User/application/UserfindById";
import { UserError } from "../../../User/domain/errors";
import { UserRepository } from "../../../User/domain/UserRepository";

export class ImageUpdateApplication {
  constructor(
    private propRepository: UserRepository | PublicationDbRepository,
    private imageDbRepository: ImageDbRepository
  ) {}

  async run(id: string, imageFile: Buffer | undefined): Promise<string> {
    let findByIdApplication: UserFindById | PublicationFindById;

    // creo que no existe forma de hacer un if interfaces asi que solo evaluo si tiene el metodo findByEmail que es de usuario
    if ("findByEmail" in this.propRepository) {
      // Si tiene el método findByEmail, es un UserRepository
      findByIdApplication = new UserFindById(
        this.propRepository as UserRepository
      );
    } else if ("findById" in this.propRepository) {
      // Si tiene el método findById pero no findByEmail, es un PublicationDbRepository
      findByIdApplication = new PublicationFindById(
        this.propRepository as PublicationDbRepository
      );
    } else {
      throw new Error("Invalid repository type");
    }

    const imageDeleteApplication = new ImageDelete(this.imageDbRepository);
    const imageUploadApplication = new ImageUpload(this.imageDbRepository);

    let imageUrl: string = "";
    const existingUser = await findByIdApplication.run(id);
    if (!existingUser) {
      throw new UserError("User not found");
    }

    if (imageFile) {
      await imageDeleteApplication.run(existingUser.imageUrl.value);
      imageUrl = await imageUploadApplication.run(imageFile);
    }

    return imageUrl;
  }
}
