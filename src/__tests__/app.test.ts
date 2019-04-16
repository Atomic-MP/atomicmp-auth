// Final integration test

import { config as dotenv } from "dotenv";
dotenv();

import App from "../app";

describe("Server constructor", () => {
  it("should run with appropriate env", () => {
    expect(() => new App());
  });
});
