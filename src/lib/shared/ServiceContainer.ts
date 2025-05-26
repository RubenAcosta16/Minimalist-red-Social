import { AuthLogin } from "../Auth/application/AuthLogin";
import { AuthRegister } from "../Auth/application/AuthRegister";
import { AuthUpdate } from "../Auth/application/AuthUpdate";
import { AuthTokenInfraestrucutre } from "../Auth/infraestructure/AuthTokenInfraestrucutre";
import { CommentCreate } from "../Comment/application/CommentCreate";
import { CommentDelete } from "../Comment/application/CommentDelete";
import { CommentFindAll } from "../Comment/application/CommentFindAll";
import { CommentFindById } from "../Comment/application/CommentFindById";
import { CommentUpdate } from "../Comment/application/CommentUpdate";
import { InMemoryCommentRepository } from "../Comment/infraestructure/InMemoryCommentRepository";
import { FeedFindAll } from "../Feed/application/FeedFindAll";
import { FindUsersFollowYou } from "../Follow/application/FindUsersFollowYou";
import { FindUsersYouFollow } from "../Follow/application/FindUsersYouFollow";
import { FollowCreate } from "../Follow/application/FollowCreate";
import { FollowDelete } from "../Follow/application/FollowDelete";
import { FollowFindById } from "../Follow/application/FollowFindById";
import { InMemoryFollowRepository } from "../Follow/infraestructure/InMemoryFollowRepository";
import { CloudinaryImageRepository } from "../Image/infraestructure/CloudinaryImageRepository";
import { ImageInMemoryRepository } from "../Image/infraestructure/InMemoryImageRepository";
import { LikeCreate } from "../Like/application/LikeCreate";
import { LikeDelete } from "../Like/application/LikeDelete";
import { LikeFindById } from "../Like/application/LikeFindById";
import { LikeFindByPubOrComm } from "../Like/application/LikeFindByPubOrCommId";
import { LikeFindByUserId } from "../Like/application/LikeFindByUserId";
import { InMemoryLikeRepository } from "../Like/infraestructure/InMemoryLikeRepository";
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
const commentRepository = new InMemoryCommentRepository();
const followRepository = new InMemoryFollowRepository();
const likeRepository = new InMemoryLikeRepository();

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
    delete: new PublicationDelete(
      publicationRepository,
      userRepository,
      imageDbRepository
    ),
  },
  comment: {
    getAll: new CommentFindAll(commentRepository),
    getOneById: new CommentFindById(commentRepository),
    create: new CommentCreate(
      commentRepository,
      userRepository,
      publicationRepository
    ),
    edit: new CommentUpdate(
      commentRepository,
      userRepository,
      publicationRepository
    ),
    delete: new CommentDelete(commentRepository, userRepository),
  },
  follow: {
    create: new FollowCreate(followRepository, userRepository),
    delete: new FollowDelete(followRepository, userRepository),
    findById: new FollowFindById(followRepository),
    findUsersYouFollow: new FindUsersYouFollow(
      followRepository,
      userRepository
    ),
    findUsersFollowYou: new FindUsersFollowYou(
      followRepository,
      userRepository
    ),
  },
  like: {
    create: new LikeCreate(
      likeRepository,
      userRepository,
      publicationRepository,
      commentRepository
    ),
    delete: new LikeDelete(likeRepository, userRepository),
    findById: new LikeFindById(likeRepository),
    findByPubOrCommId: new LikeFindByPubOrComm(
      likeRepository,
      commentRepository,
      publicationRepository
    ),
    findByUserId: new LikeFindByUserId(likeRepository, userRepository),
  },
  feed: {
    feedFindAll: new FeedFindAll(publicationRepository),
  },
};
