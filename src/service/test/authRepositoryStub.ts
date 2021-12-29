import AuthRepository from "../../interface/AuthRepository";
import Customer from "../../model/customer";

export default class authRepositoryStub implements AuthRepository {
  constructor(public customers: Customer[]) {}
  login(id: string, password: string): Customer | undefined {
    return this.customers.find((customer) => {
      return customer.id === id && customer.password === password;
    });
  }
}
