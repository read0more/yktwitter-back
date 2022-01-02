import { Router } from "express";
import Customer from "../model/customer";
import mysqlCustomerRepository from "../repository/mysqlCustomerRepository";
import CustomerService from "../service/customerService";

const router = Router();
const customerService = new CustomerService(new mysqlCustomerRepository());
export const ROOT = "/customer";
export const ME = "/me";
export const GET = "/:id";
export const POST = "/";

router.get(ME, (req, res, next) => {
  // todo: 자기 정보 가져오기
  res.status(200).send("");
});

router.get(GET, async (req, res) => {
  let customer = null;
  if (req.params.id) {
    customer = await customerService.read(req.params.id);
  }

  res.status(200).send(customer);
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
    res.status(500).send("Failed user create");
  }
});

export default router;
