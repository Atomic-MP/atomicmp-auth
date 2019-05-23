import { isModerator } from "..";
import UserFixture from "../../utils/fixtures/User.fixture";

describe("isModerator helper function", () => {
  let user;
  it("should return true if user role is Admin", () => {
    user = UserFixture({
      role: 5,
    });
    expect(isModerator(user.role)).toEqual(true);
  });
  it("should return true if user role is Moderator", () => {
    user = UserFixture({
      role: 4,
    });
    expect(isModerator(user.role)).toEqual(true);
  });
  it("should return false if user role is User", () => {
    user = UserFixture({
      role: 3,
    });
    expect(isModerator(user.role)).toEqual(false);
  });
});
