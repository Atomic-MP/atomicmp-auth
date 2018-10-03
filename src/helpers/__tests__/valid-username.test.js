/* eslint-jest */
const faker = require('faker');
const { isValidUsername } = require('..');

describe('is valid username helper', () => {
  test('to be true between 3 and 24 characters', () => {
    expect(
      isValidUsername({
        username: faker.name.firstName().substring(0, 24),
      })
    );
  });
});
