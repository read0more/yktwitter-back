import Customer from "../model/customer";

export default interface CustomerRepository {
  create(customer: Customer): void;
}
