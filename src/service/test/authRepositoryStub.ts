import AuthRepository from "../../interface/AuthRepository";
import Customer from "../../model/customer";

export default class authRepositoryStub implements AuthRepository {
  constructor(public customers: Customer[]) {}
  login(id: string, password: string): Promise<Customer | null> {
    return new Promise((resolve, reject) => {
      let customer = this.customers.find((customer) => {
        return customer.id === id && customer.password === password;
      });

      if (customer === undefined) {
        resolve(null);
      } else {
        resolve(customer);
      }
    });
  }
}
