import { Request, Response } from "express";
import verifyToken from "../library/verifyToken";
import Customer from "../model/Customer";
import MysqlCustomerRepository from "../repository/MysqlCustomerRepository";
import CustomerService from "../service/CustomerService";

const customerService = new CustomerService(new MysqlCustomerRepository());

export async function create(req: Request, res: Response) {
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

    await customerService.create(customer);
    res.status(201).send("");
  } catch (e) {
    console.log(e);
    res.status(500).send("Failed create customer");
  }
}

export async function get(req: Request, res: Response) {
  try {
    let customer = null;
    let id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
      throw Error();
    }

    customer = await customerService.read(id);
    res.status(200).send(customer);
  } catch (e) {
    res.status(500).send("Failed get customer");
  }
}

export async function put(req: Request, res: Response) {
  try {
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
  } catch (e) {
    res.status(500).send("Failed update customer");
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  try {
    let entity_id = parseInt(req.params.id);
    const customer = verifyToken(req.token);

    if (entity_id !== customer.entity_id) {
      throw Error();
    }

    const result = await customerService.delete(entity_id);
    res.status(204).send(result);
  } catch (e) {
    res.status(500).send("Failed delete customer");
  }
}
