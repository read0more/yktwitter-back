import Customer from "../../model/customer";
import CustomerService from "../customerService";
import CustomerRepositoryStub from "./customerRepositoryStub";

describe("customerService", () => {
  let customerService: CustomerService;
  let customer: Customer;
  let customerRepositoryStub: CustomerRepositoryStub;

  beforeEach(() => {
    customerRepositoryStub = new CustomerRepositoryStub();
    jest.spyOn(customerRepositoryStub, "create");
    customerService = new CustomerService(customerRepositoryStub);
    const id = "ykpark";
    const password = "password";
    const name = "name";
    const email = "ykpark@test.com";
    const profilePictureURL = "https://google.com";
    customer = new Customer(id, password, name, email, profilePictureURL);
  });

  it("create customer", () => {
    customerService.create(customer);
    expect(customerRepositoryStub.create).toHaveBeenCalledWith(customer);
  });
});
