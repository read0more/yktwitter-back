import Customer from "../model/customer";

export default interface CustomerRepository {
  create(customer: Customer): void;
  read(id: string): Customer | null;
  update(customer: Customer): Customer | null;
  delete(id: string): boolean;
}
