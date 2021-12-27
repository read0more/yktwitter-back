import AuthRepository from "../interface/AuthRepository";
import Customer from "../model/customer";

export default class AuthService {
  constructor(private authRepository: AuthRepository) {}
  login(id: string, password: string) {
    return this.authRepository.login(id, password);
  }
}
