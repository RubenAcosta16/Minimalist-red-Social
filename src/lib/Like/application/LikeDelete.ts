import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { LikeError, LikeNotFoundError } from "../domain/errors";
import { LikeDbRepository } from "../domain/LIkeRepository";
import { LikeId } from "../domain/props/LikeId";
import { LikeType } from "../domain/props/LikeType";

export class LikeDelete {
  constructor(
    private likeRepository: LikeDbRepository,
    private userDbRepository: UserRepository
  ) {}

  async run(id: string, type: string, idUser: string): Promise<void> {
    const followFound = await this.likeRepository.findById(
      new LikeId(id),
      new LikeType(type)
    );
    if (!followFound) throw new LikeNotFoundError("Like Not Found");

    const FoundUser = await this.userDbRepository.findById(new UserId(idUser));
    if (!FoundUser) throw new LikeError("User Not Found");

    if (followFound.idUser.value !== idUser)
      throw new LikeError("You are not the owner of this like");

    await this.likeRepository.delete(new LikeId(id));
  }
}
