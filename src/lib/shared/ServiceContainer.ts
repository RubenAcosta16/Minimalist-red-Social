import { AuthLogin } from "../Auth/application/AuthLogin";
import { AuthRegister } from "../Auth/application/AuthRegister";
import { AuthUpdate } from "../Auth/application/AuthUpdate";
import { AuthTokenInfraestrucutre } from "../Auth/infraestructure/AuthTokenInfraestrucutre";
import { CloudinaryImageRepository } from "../Image/infraestructure/CloudinaryImageRepository";
import { ImageInMemoryRepository } from "../Image/infraestructure/InMemoryImageRepository";
import { PublicationCreate } from "../Publication/application/PublicationCreate";
import { PublicationDelete } from "../Publication/application/PublicationDelete";
import { PublicationFindAll } from "../Publication/application/PublicationFindAll";
import { PublicationFindById } from "../Publication/application/PublicationFindById";
import { PublicationUpdate } from "../Publication/application/PublicationUpdate";
import { InMemoryPublicationRepository } from "../Publication/infraestructure/InMemoryPublicationRepository";
import { UserCreate } from "../User/application/UserCreate";
import { UserDelete } from "../User/application/UserDelete";
import { UserFindAll } from "../User/application/UserFindAll";
import { UserFindById } from "../User/application/UserfindById";
import { UserUpdate } from "../User/application/UserUpdate";
import { InMemoryUserRepository } from "../User/infrastructure/db/InMemoryUserRepository";

const userRepository = new InMemoryUserRepository();
const authRepository = new AuthTokenInfraestrucutre();
const publicationRepository = new InMemoryPublicationRepository();

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
  publication: {
    getAll: new PublicationFindAll(publicationRepository),
    getOneById: new PublicationFindById(publicationRepository),
    create: new PublicationCreate(
      publicationRepository,
      userRepository,
      imageDbRepository,
      imageUtilsRepository
    ),
    edit: new PublicationUpdate(
      publicationRepository,
      userRepository,
      imageDbRepository,
      imageUtilsRepository
    ),
    delete: new PublicationDelete(publicationRepository, imageDbRepository),
  },
};
