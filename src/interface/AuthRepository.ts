import { TokenInterface } from "./../service/AuthService";
import Customer from "../model/customer";

export default interface AuthRepository {
  login(id: string, password: string): Promise<Customer | null>;
}
