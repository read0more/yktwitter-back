import Customer from "../../model/customer";
import AuthService from "../AuthService";
import AuthRepositoryStub from "./authRepositoryStub";

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
    const user = authService.login(customers[1].id, customers[1].password);
    expect(user).toEqual(customers[1]);
  });

  it("trying login dosen't exists", () => {
    const user = authService.login("none", "none");
    expect(user).toEqual(undefined);
  });
});
