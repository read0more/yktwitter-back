import AuthRepository from "../interface/AuthRepository";
import jwt from "jsonwebtoken";

export interface TokenInterface {
  entity_id: number;
  id: string;
  exp?: number;
  iat?: number;
  name: string;
  email: string;
  profile_picture_url: string;
}
export default class AuthService {
  constructor(private authRepository: AuthRepository) {}
  async login(id: string, password: string) {
    const customer = await this.authRepository.login(id, password);
    const customerObject = customer?.toObject();
    const salt = process.env.PASSWORD_SALT;

    if (customerObject && salt) {
      customerObject.password = "";
      return jwt.sign(customerObject, salt, { expiresIn: "6h" });
    }

    return null;
  }

  me(token: string) {
    const customer = jwt.verify(
      token,
      process.env.PASSWORD_SALT as string
    ) as TokenInterface;

    return customer;
  }
}
