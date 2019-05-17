// Final integration test

import { config as dotenv } from "dotenv";
dotenv();

import App from "../app";

describe("Server constructor", () => {

  beforeAll(() => {
    process.env.JWT_SECRET = "";
  });

  it("should run with appropriate env", () => {
    const app = new App();

    expect(app).toBeInstanceOf(App);
  });
});
