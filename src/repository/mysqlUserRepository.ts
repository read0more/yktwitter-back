import CustomerRepository from "../interface/CustomerRepository";
import Customer from "../model/customer";
import { createConnection, Connection } from "mysql";
export default class mysqlUserRepository implements CustomerRepository {
  private connection: Connection;

  constructor() {
    this.connection = createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });

    this.connection.connect(function (err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }

      console.log("connected");
    });
  }

  create(customer: Customer): void {
    const query = "INSERT INTO customer SET ?";
    this.connection.query(query, customer.getObject());
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
