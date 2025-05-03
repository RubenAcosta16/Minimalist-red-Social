import { ImageUrl } from "../../Image/domain/props/ImageUrl";
import { UserEmail } from "./Props/UserEmail";
import { UserId } from "./Props/UserId";
import { UserName } from "./Props/UserName";
import { UserPassword } from "./Props/UserPassword";


export class User {
  id: UserId;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  imageUrl: ImageUrl;

  constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    imageUrl: ImageUrl
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.imageUrl = imageUrl;
  }

  public mapToPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      imageUrl: this.imageUrl.value,
      password: this.password.value,
    };
  }

  public mapToPrimitivesNoPassword() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      imageUrl: this.imageUrl.value,
    };
  }
}
