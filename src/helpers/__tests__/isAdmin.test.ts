import { isAdmin } from "..";
import UserFixture from "../../utils/fixtures/User.fixture";

describe("isAdmin helper function", () => {
  let user;
  it("should return true if user role is Admin", () => {
    user = UserFixture({
      role: 5,
    });
    expect(isAdmin(user.role)).toEqual(true);
  });
  it("should return false if user is Moderator rank", () => {
    user = UserFixture({
      role: 4,
    });
    expect(isAdmin(user.role)).toEqual(false);
  });
  it("should return false if user is User rank", () => {
    user = UserFixture({
      role: 3,
    });
    expect(isAdmin(user.role)).toEqual(false);
  });
});
