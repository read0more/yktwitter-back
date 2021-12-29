import Customer from "../../model/customer";
import AuthService, { TokenInterface } from "../AuthService";
import AuthRepositoryStub from "./authRepositoryStub";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

describe("authService", () => {
  let authService: AuthService;
  const customers = [
    new Customer("yk1", "66c", "park", "park@test.com", "https://google.com"),
    new Customer("yk2", "jc", "yun", "yun@test.com", "https://yunyun.com"),
  ];

  beforeEach(() => {
    authService = new AuthService(new AuthRepositoryStub(customers));
  });
  it("login", () => {
    const targetCustomer = customers[1].toObject();
    const token = authService.login(customers[1].id, customers[1].password);
    const customer = jwt.verify(
      token as string,
      process.env.PASSWORD_SALT as string
    ) as TokenInterface;

    expect(customer.id).toBe(targetCustomer.id);
    expect(customer.email).toBe(targetCustomer.email);
    expect(customer.name).toBe(targetCustomer.name);
    expect(customer.profile_picture_url).toBe(
      targetCustomer.profile_picture_url
    );
  });

  it("trying login dosen't exists", () => {
    const user = authService.login("none", "none");
    expect(user).toEqual(null);
  });
});
