import { AuthLogin } from "../Auth/application/AuthLogin";
import { AuthRegister } from "../Auth/application/AuthRegister";
import { AuthUpdate } from "../Auth/application/AuthUpdate";
import { AuthTokenInfraestrucutre } from "../Auth/infraestructure/AuthTokenInfraestrucutre";
import { CloudinaryImageRepository } from "../Image/infraestructure/CloudinaryImageRepository";
// import { ImageDelete } from "../Image/application/ImageDelete";
// import { ImageUpload } from "../Image/application/ImageUpload"
import { ImageInMemoryRepository } from "../Image/infraestructure/InMemoryImageRepository";
import { UserCreate } from "../User/application/UserCreate";
import { UserDelete } from "../User/application/UserDelete";
import { UserFindAll } from "../User/application/UserFindAll";
import { UserFindById } from "../User/application/UserfindById";
import { UserUpdate } from "../User/application/UserUpdate";
import { InMemoryUserRepository } from "../User/infrastructure/db/InMemoryUserRepository";

const userRepository = new InMemoryUserRepository();
const authRepository = new AuthTokenInfraestrucutre();

const imageDbRepository = new ImageInMemoryRepository();
const imageUtilsRepository = new CloudinaryImageRepository();

export const ServiceContainer = {
  user: {
    getAll: new UserFindAll(userRepository),
    getOneById: new UserFindById(userRepository),
    create: new UserCreate(
      userRepository,
      imageDbRepository,
      imageUtilsRepository
    ),
    edit: new UserUpdate(
      userRepository,
      imageDbRepository,
      imageUtilsRepository
    ),
    delete: new UserDelete(userRepository, imageDbRepository),
  },
  auth: {
    login: new AuthLogin(userRepository, authRepository),
    update: new AuthUpdate(
      userRepository,
      authRepository,
      imageDbRepository,
      imageUtilsRepository
    ),
    register: new AuthRegister(
      userRepository,
      authRepository,
      imageDbRepository,
      imageUtilsRepository
    ),
  },
};
