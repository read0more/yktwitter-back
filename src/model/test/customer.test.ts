import Customer from "../customer";

describe("customer model", () => {
  it("check value is set", () => {
    const id = "ykpark";
    const password = "password";
    const name = "name";
    const email = "ykpark@test.com";
    const profilePictureURL = "https://google.com";
    const customer = new Customer(id, password, name, email, profilePictureURL);

    expect(customer.id).toBe(id);
    expect(customer.password).toBe(password);
    expect(customer.name).toBe(name);
    expect(customer.email).toBe(email);
    expect(customer.profilePictureURL).toBe(profilePictureURL);
  });

  it("email validation failed", () => {
    const id = "ykpark";
    const password = "password";
    const name = "name";
    const email = "this is not email";
    const profilePictureURL = "https://google.com";
    expect(() => {
      new Customer(id, password, name, email, profilePictureURL);
    }).toThrow("Invalid email");
  });
});
