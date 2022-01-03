import { TokenInterface } from "./../AuthService";
import CustomerRepository from "../../interface/CustomerRepository";
import Customer from "../../model/Customer";

const customerData: {
  [key: number]: Customer;
} = {
  1: new Customer(
    1,
    "ykpark",
    "password",
    "name",
    "ykpark@test.com",
    "https://google.com"
  ),
  2: new Customer(
    2,
    "ykpark",
    "password",
    "park",
    "park@test.com",
    "http://test.com"
  ),
};
export default class customerRepositoryStub implements CustomerRepository {
  create(customer: Customer): void {}
  read(id: number): Promise<Customer | null> {
    return new Promise((resolve) => {
      if (customerData[id]) {
        resolve(customerData[id]);
      } else {
        resolve(null);
      }
    });
  }

  update(customer: Customer): Promise<Customer | null> {
    return new Promise((resolve) => {
      if (!customer.entityId || !customerData[customer.entityId]) {
        resolve(null);
      } else {
        customerData[customer.entityId] = customer;
        resolve(customerData[customer.entityId]);
      }
    });
  }

  delete(id: number): boolean {
    return !!customerData[id];
  }
}
