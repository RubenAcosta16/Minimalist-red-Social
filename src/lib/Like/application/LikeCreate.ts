import { CommentDbRepository } from "../../Comment/domain/CommentRepository";
import { PublicationDbRepository } from "../../Publication/domain/PublicationRepository";
import { generateId } from "../../shared/infraestructure/generateId";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { LikeError } from "../domain/errors";
import { LikeDbRepository } from "../domain/FollowRepository";
import { Like } from "../domain/Like";
import { LikeId } from "../domain/props/LikeId";
import { LikeType } from "../domain/props/LikeType";

export class LikeCreate {
  constructor(
    private likeRepository: LikeDbRepository,
    private userRepository: UserRepository,
    private PubOrCommRepository: PublicationDbRepository | CommentDbRepository
  ) {}

   async run(
    // id: string,
    idUser: string,
    idPubOrComm: never,
    likeType: string
  ): Promise<void> {
    const id = generateId();

    const likeFound = await this.likeRepository.findById(
      new LikeId(id),
      new LikeType(likeType)
    );
    if (!likeFound) throw new LikeError("like not exists");

    const userFound = await this.userRepository.findById(new UserId(idUser));
    if (!userFound) throw new LikeError("user not found");

    const idPubOrCommFound = await this.PubOrCommRepository.findById(
      idPubOrComm
    );
    if (!idPubOrCommFound)
      throw new LikeError("Publication or Comment not found");

    const like = new Like(
      new LikeId(id),
      new UserId(idUser),
      idPubOrComm,
      new LikeType(likeType)
    );

    return await this.likeRepository.create(like);
  }
}
