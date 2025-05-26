import { Comment } from "../../Comment/domain/Comment";
import { CommentDbRepository } from "../../Comment/domain/CommentRepository";
import { CommentId } from "../../Comment/domain/props/CommentId";
import { PublicationId } from "../../Publication/domain/props/PublicationId";
import { Publication } from "../../Publication/domain/Publication";
import { PublicationDbRepository } from "../../Publication/domain/PublicationRepository";
import { generateId } from "../../shared/infraestructure/generateId";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { LikeError } from "../domain/errors";
import { LikeDbRepository } from "../domain/LIkeRepository";
import { Like } from "../domain/Like";
import { LikeId } from "../domain/props/LikeId";
import { LikeType } from "../domain/props/LikeType";

export class LikeCreate {
  constructor(
    private likeRepository: LikeDbRepository,
    private userRepository: UserRepository,
    private publicationRepository: PublicationDbRepository,
    private commentRepository: CommentDbRepository
  ) {}

  async run(
    // id: string,
    idUser: string,
    idPubOrComm: string,
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

    let idPubOrCommFound: Publication | Comment | null = null;

    if (likeType === "publication") {
      idPubOrCommFound = await this.commentRepository.findById(new CommentId(idPubOrComm));
    } else if (likeType === "comment") {
      idPubOrCommFound = await this.publicationRepository.findById(new PublicationId(idPubOrComm));
    }

    if (!idPubOrCommFound)
      throw new LikeError("Publication or Comment not found");

    const like = new Like(
      new LikeId(id),
      new UserId(idUser),
      idPubOrCommFound.id,
      new LikeType(likeType)
    );

    return await this.likeRepository.create(like);
  }
}
