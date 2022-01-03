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
    customer = new Customer(1, id, password, name, email, profilePictureURL);
  });

  it("create customer", () => {
    customerService.create(customer);
    expect(customerRepositoryStub.create).toHaveBeenCalledWith(customer);
  });

  describe("read customer", () => {
    it("read customer", async () => {
      const customerByService = await customerService.read(1);
      expect(customerByService).toEqual(customer);
    });

    it("read donsn't exist customer", async () => {
      const customerByService = await customerService.read(3);
      expect(customerByService).toBe(null);
    });
  });

  describe("update customer", () => {
    it("update customer", async () => {
      customer.password = "new pass";
      customer.name = "new name";
      customer.email = "newEmail@test.com";
      customer.profilePictureURL = "https://new.com";
      const updatedCustomer = await customerService.update(customer);
      expect(updatedCustomer).toEqual(customer);
    });

    it("trying to update donsn't exist customer", async () => {
      const fakeCustomer = new Customer(
        3,
        "123",
        "asd",
        "name",
        "email@test.com",
        "https://gsdg.com"
      );
      const result = await customerService.update(fakeCustomer);
      expect(result).toBe(null);
    });
  });

  describe("delete customer", () => {
    it("delete customer", async () => {
      const result = await customerService.delete(2);
      expect(result).toBe(true);
    });

    it("trying to delete donsn't exist customer", async () => {
      const result = await customerService.delete(4);
      expect(result).toBe(false);
    });
  });
});
