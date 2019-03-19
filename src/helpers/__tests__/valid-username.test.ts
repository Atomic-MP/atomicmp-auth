/* eslint-jest */
import faker from "faker";
import { isValidUsername as fn } from "..";

describe("is valid username helper", () => {
  test("to be truthy between 3 and 24 characters", () => {
    const username = faker.name.firstName().substring(0, 24);
    expect(fn(username)).toBeTruthy();
  });
  test("to be falsy if username starts with space", () => {
    const username = ` ${faker.name.firstName().substring(0, 23)}`;
    expect(fn(username)).toBeFalsy();
  });
  test("to be falsy if username contains less than 3 letters", () => {
    const username = `${faker.random.alphaNumeric(
      1,
    )} ${faker.random.alphaNumeric(1)}`;
    expect(fn(username)).toBeFalsy();
  });
  test("to be falsy on non-alphabetical characters", () => {
    const usernameArr = [
      "R6S",
      "R-J",
      "!!!",
      "Po' Boy",
      "test!",
      "test@",
      "test#",
      "test$",
      "test%",
      "test^",
      "test&",
      "test*",
      "test(",
      "test)",
      "falsy boi👌",
    ];
    usernameArr.forEach((username) => expect(fn(username)).toBeFalsy());
  });
});
