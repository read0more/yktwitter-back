import Customer from "../model/Customer";
export default interface CustomerRepository {
  create(customer: Customer): Promise<boolean>;
  read(id: number): Promise<Customer | null>;
  update(customer: Customer): Promise<Customer | null>;
  delete(id: number): Promise<boolean>;
}
