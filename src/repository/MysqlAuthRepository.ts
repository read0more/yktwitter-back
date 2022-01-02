import { TokenInterface } from "../service/AuthService";
import AuthRepository from "../interface/AuthRepository";
import Customer from "../model/customer";
import { createPassword } from "../library/hash";

export default class MysqlAuthRepository implements AuthRepository {
  login(id: string, password: string): Promise<Customer> {
    const query =
      "SELECT id, name, email, profile_picture_url FROM customer WHERE id = ? AND password = ?";
    return new Promise((resolve, reject) => {
      global.connection.query(query, [id, password], (error, results) => {
        if (!results?.length || error) {
          reject(error);
        } else {
          const customer = new Customer(
            results[0].id,
            results[0].password,
            results[0].name,
            results[0].email,
            results[0].profile_picture_url
          );
          resolve(customer);
        }
      });
    });
  }
}