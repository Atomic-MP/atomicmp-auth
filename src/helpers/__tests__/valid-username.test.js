/* eslint-jest */
const faker = require('faker');
const { isValidUsername } = require('..');

describe('is valid username helper', () => {
  test('to be truthy between 3 and 24 characters', () => {
    let username = faker.name.firstName().substring(0, 24);
    expect(isValidUsername(username));
  });
});
