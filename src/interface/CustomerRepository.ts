import Customer from "../model/Customer";
export default interface CustomerRepository {
  create(customer: Customer): void;
  read(id: number): Promise<Customer | null>;
  update(customer: Customer): Customer | null;
  delete(id: number): boolean;
}
