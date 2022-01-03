import * as EmailValidator from "email-validator";
import { createPassword } from "../library/hash";

export default class Customer {
  private _entity_id: number | null = null;
  private _id: string = "";
  private _password: string = "";
  private _name: string = "";
  private _email: string = "";
  private _profilePictureURL: string = "";

  constructor(
    entity_id: number | null,
    id: string,
    password: string,
    name: string,
    email: string,
    profilePictureURL: string
  ) {
    this._entity_id = entity_id;
    this._id = id;
    this.password = password;
    this.name = name;
    this.email = email;
    this.profilePictureURL = profilePictureURL;
  }

  public get entity_id() {
    return this._entity_id;
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
    this._password = createPassword(password, process.env.PASSWORD_SALT);
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
      entity_id: this._entity_id,
      id: this.id,
      password: this.password,
      name: this.name,
      email: this.email,
      profile_picture_url: this.profilePictureURL,
    };
  }
}
