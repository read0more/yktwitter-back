import CustomerRepository from "../interface/CustomerRepository";
import customer from "../model/customer";

class mysqlUserRepository implements CustomerRepository {
  create(customer: customer): void {}
}
