import CustomerRepository from "../../interface/CustomerRepository";
import customer from "../../model/customer";

export default class customerRepositoryStub implements CustomerRepository {
  create(customer: customer): void {}
}
