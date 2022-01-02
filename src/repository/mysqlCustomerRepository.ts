import { TokenInterface } from "../service/AuthService";
import CustomerRepository from "../interface/CustomerRepository";
import Customer from "../model/Customer";
export default class MysqlCustomerRepository implements CustomerRepository {
  create(customer: Customer): void {
    const query = "INSERT INTO customer SET ?";
    global.connection.query(query, customer.toObject());
  }

  read(id: string): Promise<TokenInterface> {
    const query =
      "SELECT id, name, email, profile_picture_url FROM customer WHERE entity_id = ?";
    return new Promise((resolve, reject) => {
      global.connection.query(query, [id], (error, results) => {
        if (!results?.length || error) {
          reject(error);
        } else {
          const customer = new Customer(
            results[0].id,
            results[0].password,
            results[0].name,
            results[0].email,
            results[0].profile_picture_url
          ).toObject();
          customer.password = "";

          resolve(customer);
        }
      });
    });
  }

  update(customer: Customer): Customer | null {
    return null;
  }

  delete(id: string): boolean {
    return true;
  }
}
