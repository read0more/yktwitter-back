import { Router } from "express";
import verifyToken from "../library/verifyToken";
import Customer from "../model/Customer";
import MysqlCustomerRepository from "../repository/MysqlCustomerRepository";
import CustomerService from "../service/CustomerService";

const router = Router();
const customerService = new CustomerService(new MysqlCustomerRepository());
export const ROOT = "/customer";
export const GET = "/:id";
export const POST = "/";
export const PUT = "/:id";

router.get(GET, async (req, res) => {
  let customer = null;

  try {
    let id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
      throw Error();
    }

    customer = await customerService.read(id);
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
      null,
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

router.put(PUT, async (req, res) => {
  let entity_id = req.params.id;
  const { id, password, name, email, profile_picture_url } = req.body;
  const customer = verifyToken(req.token);

  if (
    parseInt(entity_id) !== customer.entity_id ||
    !id ||
    !password ||
    !name ||
    !email ||
    !profile_picture_url
  ) {
    console.log("han");
    throw Error();
  }

  const result = await customerService.update(
    new Customer(
      customer.entity_id,
      id,
      password,
      name,
      email,
      profile_picture_url
    )
  );

  res.status(200).send(result);
});

export default router;
