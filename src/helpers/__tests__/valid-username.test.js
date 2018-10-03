/* eslint-jest */
const faker = require('faker');
const { isValidUsername } = require('..');

test('isValidUsername helper', () => {
  describe('to be true between 3 and 24 characters', () => {
    expect(
      isValidUsername({
        username: faker.name().substring(0, 24),
      })
    );
  });
});
