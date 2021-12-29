import CustomerRepository from "../interface/CustomerRepository";
import Customer from "../model/customer";
export default class MysqlUserRepository implements CustomerRepository {
  create(customer: Customer): void {
    const query = "INSERT INTO customer SET ?";
    global.connection.query(query, customer.toObject());
  }

  read(id: string): Customer | null {
    return null;
  }

  update(customer: Customer): Customer | null {
    return null;
  }

  delete(id: string): boolean {
    return true;
  }
}
