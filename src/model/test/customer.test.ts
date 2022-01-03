import Customer from "../customer";
import sha256 from "crypto-js/sha256";
import dotenv from "dotenv";
dotenv.config();

describe("customer model", () => {
  it("check value is set", () => {
    const id = "ykpark";
    const password = "password";
    const name = "name";
    const email = "ykpark@test.com";
    const profilePictureURL = "https://google.com";
    const customer = new Customer(
      null,
      id,
      password,
      name,
      email,
      profilePictureURL
    );

    expect(customer.id).toBe(id);
    expect(customer.password).toBe(
      sha256(password + process.env.PASSWORD_SALT).toString()
    );
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
      new Customer(null, id, password, name, email, profilePictureURL);
    }).toThrow("Invalid email");
  });
});
