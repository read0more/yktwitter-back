import { Router } from "express";
import Customer from "../model/Customer";
import MysqlCustomerRepository from "../repository/MysqlCustomerRepository";
import CustomerService from "../service/CustomerService";

const router = Router();
const customerService = new CustomerService(new MysqlCustomerRepository());
export const ROOT = "/customer";
export const GET = "/:id";
export const POST = "/";

router.get(GET, async (req, res) => {
  let customer = null;

  try {
    if (!req.params.id) {
      throw Error();
    }

    customer = await customerService.read(req.params.id);
    res.status(200).send(customer);
  } catch (e) {
    res.status(400).send("Failed get customer");
  }
});

router.post(POST, (req, res) => {
  try {
    const { id, password, name, email, profile_picture_url } = req.body;
    if (!id || !password || !name || !email) {
      throw Error();
    }

    const customer = new Customer(
      id,
      password,
      name,
      email,
      profile_picture_url
    );

    customerService.create(customer);
    res.status(201).send("");
  } catch (e) {
    console.log(e);
    res.status(500).send("Failed customer create");
  }
});

export default router;
