import UserFixture from "../../utils/fixtures/User.fixture"

describe("User class `getMoney` method", () => {
  it("Should return 0 if no currency held", () => {
    const user = UserFixture()

    expect(user.getMoney()).toBe(0);
    
  })
  it('Should return value of one stack of currency\'s quantity', () => {
    const user = UserFixture({
      inventory: [{
        id: "Currency_Cap",
        quantity: 40
      }]
    })

    expect(user.getMoney()).toBe(40)
  })

  it('Should consolidate multiple stacks of currency', () => {
    const user = UserFixture({
      inventory: [{
        id: "Currency_Cap",
        quantity: 40
      }, {
        id: "Currency_Cap",
        quantity: 40
      }]
    })

    expect(user.getMoney()).toBe(80)
  })

  it('Should ignore non-currency items', () => {
    const user = UserFixture({
      inventory: [{
        id: "Currency_Cap",
        quantity: 40
      }, {
        id: "Other_Thing",
        quantity: 40
      }]
    })

    expect(user.getMoney()).toBe(40)
  })
})