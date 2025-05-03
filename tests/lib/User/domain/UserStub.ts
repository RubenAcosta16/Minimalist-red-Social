import { UserEmail } from "../../../../src/lib/User/domain/Props/UserEmail";
import { UserId } from "../../../../src/lib/User/domain/Props/UserId";
import { UserName } from "../../../../src/lib/User/domain/Props/UserName";
import { UserPassword } from "../../../../src/lib/User/domain/Props/UserPassword";
import { UserImageUrl } from "../../../../src/lib/User/domain/Props/UserImageUrl";
import { User } from "../../../../src/lib/User/domain/User";
import {
  randEmail,
  randFirstName,
  randUuid,
  randUrl,
  // randPassword,
} from "@ngneat/falso";

export class UserStub {
  static create(): User {
    return this.returnUser();
  }

  private static returnUser(): User {
    return new User(
      new UserId(randUuid()),
      new UserName(this.createSafeName()),
      new UserEmail(randEmail()),
      new UserPassword("12345678"),
      new UserImageUrl(randUrl())
    );
  }

  private static createSafeName(): string {
    const name = randFirstName();
    if (name.length < 3) return this.createSafeName();
    return name;
  }
}
