import CustomerRepository from "../interface/CustomerRepository";
import customer from "../model/customer";
import { createConnection, Connection } from "mysql";

class mysqlUserRepository implements CustomerRepository {
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

  create(customer: customer): void {}
}
