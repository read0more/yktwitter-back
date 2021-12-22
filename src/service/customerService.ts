import CustomerRepository from "../interface/CustomerRepository";
import Customer from "../model/customer";

export default class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  create(customer: Customer) {
    this.customerRepository.create(customer);
  }
}
