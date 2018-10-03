/* eslint-jest */
const faker = require('faker');
const { isValidSignupCredentials } = require('..')

let password;
test('isValidSignupCredentials helper', () => {
  beforeEach(() => {
    password = faker.password()
  })
  describe('to be true on valid', () => {
    
    expect(isValidSignupCredentials({
      username: faker.name.findName(),
      password,
      confirmPassword: password,
      key: faker.random.uuid()
    }))
  })
})