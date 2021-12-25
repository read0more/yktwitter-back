import CustomerRepository from "../interface/CustomerRepository";
import Customer from "../model/customer";

export default class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  create(customer: Customer) {
    this.customerRepository.create(customer);
  }

  read(id: string) {
    return this.customerRepository.read(id);
  }

  update(customer: Customer) {
    return this.customerRepository.update(customer);
  }

  delete(id: string) {
    return this.customerRepository.delete(id);
  }
}
