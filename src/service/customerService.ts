import CustomerRepository from "../interface/CustomerRepository";
import Customer from "../model/Customer";

export default class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  create(customer: Customer) {
    this.customerRepository.create(customer);
  }

  read(id: number) {
    return this.customerRepository.read(id);
  }

  update(customer: Customer) {
    return this.customerRepository.update(customer);
  }

  delete(id: number) {
    return this.customerRepository.delete(id);
  }
}
