import * as EmailValidator from "email-validator";
import sha256 from "crypto-js/sha256";

export default class Customer {
  private _id: string = "";
  private _password: string = "";
  private _name: string = "";
  private _email: string = "";
  private _profilePictureURL: string = "";

  constructor(
    id: string,
    password: string,
    name: string,
    email: string,
    profilePictureURL: string
  ) {
    this._id = id;
    this.password = password;
    this.name = name;
    this.email = email;
    this.profilePictureURL = profilePictureURL;
  }

  public get id() {
    return this._id;
  }

  public get password() {
    return this._password;
  }

  public get name() {
    return this._name;
  }
  public get email() {
    return this._email;
  }

  public get profilePictureURL() {
    return this._profilePictureURL;
  }

  public set password(password: string) {
    this._password = sha256(password + process.env.PASSWORD_SALT).toString();
  }

  public set name(name: string) {
    this._name = name;
  }
  public set email(email: string) {
    if (!EmailValidator.validate(email)) {
      throw Error("Invalid email");
    }

    this._email = email;
  }

  public set profilePictureURL(profilePictureURL: string) {
    this._profilePictureURL = profilePictureURL;
  }

  public toObject() {
    return {
      id: this.id,
      password: this.password,
      name: this.name,
      email: this.email,
      profile_picture_url: this.profilePictureURL,
    };
  }
}
