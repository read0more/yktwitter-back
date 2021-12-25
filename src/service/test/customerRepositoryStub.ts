import CustomerRepository from "../../interface/CustomerRepository";
import Customer from "../../model/customer";

const customerData: {
  [key: string]: Customer;
} = {
  ykpark: new Customer(
    "ykpark",
    "password",
    "name",
    "ykpark@test.com",
    "https://google.com"
  ),
  ykpark2: new Customer(
    "ykpark",
    "password",
    "park",
    "park@test.com",
    "http://test.com"
  ),
};
export default class customerRepositoryStub implements CustomerRepository {
  create(customer: Customer): void {}
  read(id: string): Customer | null {
    return customerData[id] || null;
  }

  update(customer: Customer): Customer | null {
    if (!customerData[customer.id]) return null;
    customerData[customer.id] = customer;
    return customerData[customer.id];
  }

  delete(id: string): boolean {
    return !!customerData[id];
  }
}