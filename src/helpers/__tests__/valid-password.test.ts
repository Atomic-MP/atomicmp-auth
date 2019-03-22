/* eslint-jest */
import * as faker from "faker";
import { isValidPassword as fn } from "..";

const validPayload = (password: string) => ({ password, confirmPassword: password });

describe("Password validation helper", () => {
  test("should be falsy if no password provided", () => {
    const payload = { password: undefined, confirmPassword: "password" };
    expect(fn(payload)).toBeFalsy();
  });
  test("should be falsy if no confirm password provided", () => {
    const payload = { password: "password", confirmPassword: undefined };
    expect(fn(payload)).toBeFalsy();
  });
  test("should be falsy if password != confirm password", () => {
    const payload = { password: "password", confirmPassword: "otherinput" };
    expect(fn(payload)).toBeFalsy();
  });
  test("should be falsy if password contains strange characters", () => {
    const passwordArr = [
      "'; DROP TABLE users;--",
      "<><><><><><>",
      "データデータデータデータ",
      '"The Dude"',
      `javascript:alert('Injection');`,
    ];

    passwordArr
      .map(validPayload)
      .forEach((payload) => expect(fn(payload)).toBeFalsy());
  });
  test("should be falsy if password length < 8", () => {
    const payload = validPayload("asdf");
    expect(fn(payload)).toBeFalsy();
  });
  test("should be falsy if password length > 50", () => {
    const password = faker.random.alphaNumeric(100);
    const payload = validPayload(password);
    expect(fn(payload)).toBeFalsy();
  });
  test("should be truthy if password === confirm password", () => {
    const password = "5uper5tr0ngp@ssw0rd";
    const payload = validPayload(password);
    expect(fn(payload)).toBeTruthy();
  });
});
