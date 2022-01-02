import Customer from "../model/customer";
import { TokenInterface } from "../service/AuthService";

export default interface CustomerRepository {
  create(customer: Customer): void;
  read(id: string): Promise<TokenInterface>;
  update(customer: Customer): Customer | null;
  delete(id: string): boolean;
}
