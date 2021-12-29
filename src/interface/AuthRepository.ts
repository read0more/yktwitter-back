import Customer from "../model/customer";

export default interface AuthRepository {
  login(id: string, password: string): Customer | undefined;
}
