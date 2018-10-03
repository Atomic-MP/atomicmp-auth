/* eslint-jest */
const faker = require('faker');
const { isValidUsername } = require('..');

describe('is valid username helper', () => {
  test('to be truthy between 3 and 24 characters', () => {
    let username = faker.name.firstName().substring(0, 24);
    expect(isValidUsername(username)).toBeTruthy();
  });
  test('to be falsy if username starts with space', () => {
    let username = ` ${faker.name.firstName().substring(0, 23)}`;
    expect(isValidUsername(username)).toBeFalsy();
  });
  test('to be falsy if username contains less than 3 letters', () => {
    let username = `${faker.random.alphaNumeric(1)} ${faker.random.alphaNumeric(
      1
    )}`;
    expect(isValidUsername(username)).toBeFalsy();
  });
  test('to be falsy on non-alphabetical characters', () => {
    expect(isValidUsername('R6S')).toBeFalsy();
    expect(isValidUsername('R-J')).toBeFalsy();
    expect(isValidUsername('!!!')).toBeFalsy();
    expect(isValidUsername("Po' Boy")).toBeFalsy();
    expect(isValidUsername('test!')).toBeFalsy();
    expect(isValidUsername('test@')).toBeFalsy();
    expect(isValidUsername('test#')).toBeFalsy();
    expect(isValidUsername('test$')).toBeFalsy();
    expect(isValidUsername('test%')).toBeFalsy();
    expect(isValidUsername('test^')).toBeFalsy();
    expect(isValidUsername('test&')).toBeFalsy();
    expect(isValidUsername('test*')).toBeFalsy();
    expect(isValidUsername('test(')).toBeFalsy();
    expect(isValidUsername('test)')).toBeFalsy();
    expect(isValidUsername('falsy boi👌')).toBeFalsy();
  });
});
