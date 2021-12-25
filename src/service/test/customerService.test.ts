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

  describe("read customer", () => {
    it("read customer", () => {
      expect(customerService.read("ykpark")).toEqual(customer);
    });

    it("read donsn't exist customer", () => {
      expect(customerService.read("nobody")).toBe(null);
    });
  });

  describe("update customer", () => {
    it("update customer", () => {
      customer.password = "new pass";
      customer.name = "new name";
      customer.email = "newEmail@test.com";
      customer.profilePictureURL = "https://new.com";
      expect(customerService.update(customer)).toEqual(customer);
    });

    it("trying to update donsn't exist customer", () => {
      const fakeCustomer = new Customer(
        "123",
        "asd",
        "name",
        "email@test.com",
        "https://gsdg.com"
      );
      expect(customerService.update(fakeCustomer)).toBe(null);
    });
  });

  describe("delete customer", () => {
    it("delete customer", () => {
      expect(customerService.delete("ykpark")).toBe(true);
    });

    it("trying to delete donsn't exist customer", () => {
      expect(customerService.delete("nonono")).toBe(false);
    });
  });
});
