import AuthRepository from "../interface/AuthRepository";
import jwt from "jsonwebtoken";

export interface TokenInterface {
  id: string;
  name: string;
  email: string;
  profile_picture_url: string;
}
export default class AuthService {
  constructor(private authRepository: AuthRepository) {}
  login(id: string, password: string) {
    const customer = this.authRepository.login(id, password)?.toObject();
    const salt = process.env.PASSWORD_SALT;

    if (customer && salt) {
      customer.password = "";
      return jwt.sign(customer, salt, { expiresIn: "1h" });
    }

    return null;
  }
}
