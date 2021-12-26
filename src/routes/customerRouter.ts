import { Router } from "express";
import Customer from "../model/customer";
import MysqlUserRepository from "../repository/MysqlUserRepository";
import CustomerService from "../service/customerService";

const router = Router();
const customerService = new CustomerService(new MysqlUserRepository());
export const ROOT = "/customer";
export const ME = "/me";
export const GET = "/:id";
export const POST = "/";

router.get(ME, (req, res) => {
  // todo: 자기 정보 가져오기
  res.status(200).send("");
});

router.get(GET, (req, res) => {
  // todo: :id값의 id 가진 사용자 정보 가져오기
  res.status(200).send("");
});

router.post(POST, (req, res) => {
  try {
    console.log(req.body);
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
