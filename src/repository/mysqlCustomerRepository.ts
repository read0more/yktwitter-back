import { OkPacket } from "mysql";
import CustomerRepository from "../interface/CustomerRepository";
import Customer from "../model/Customer";
export default class MysqlCustomerRepository implements CustomerRepository {
  create(customer: Customer): Promise<boolean> {
    const query = "INSERT INTO customer SET ?";
    return new Promise((resolve, reject) => {
      global.connection.query(
        query,
        customer.toObject(),
        (error, results: OkPacket) => {
          if (error || !results.affectedRows) {
            reject(error);
          }

          resolve(true);
        }
      );
    });
  }

  read(id: number): Promise<Customer> {
    const query =
      "SELECT id, name, email, profile_picture_url FROM customer WHERE entity_id = ?";
    return new Promise((resolve, reject) => {
      global.connection.query(query, [id], (error, results) => {
        if (!results?.length || error) {
          reject(error);
        } else {
          const customer = new Customer(
            results[0].entity_id,
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

  update(customer: Customer): Promise<Customer | null> {
    const query =
      "UPDATE customer SET email = ?, profile_picture_url = ?, password = ?, name = ?, id = ? WHERE entity_id = ?;";
    return new Promise((resolve, reject) => {
      global.connection.query(
        query,
        [
          customer.email,
          customer.profilePictureURL,
          customer.password,
          customer.name,
          customer.id,
          customer.entityId,
        ],
        (error) => {
          if (error) {
            reject(error);
          }

          resolve(customer);
        }
      );
    });
  }

  delete(id: number): Promise<boolean> {
    const query = "DELETE FROM customer WHERE entity_id = ?";
    return new Promise((resolve, reject) => {
      global.connection.query(query, [id], (error, results: OkPacket) => {
        if (error || !results.affectedRows) {
          reject(error);
        }

        resolve(true);
      });
    });
  }
}
