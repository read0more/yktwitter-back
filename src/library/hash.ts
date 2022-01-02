import sha256 from "crypto-js/sha256";

export function createPassword(password: string, salt: string = "") {
  return sha256(password + salt).toString();
}
