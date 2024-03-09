import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { describe, it } from "mocha";
import {server} from "../src/server";

chai.use(chaiHttp);

/**
 * unit test for login service using mocha
 */
describe("login", () => {
  it("should return a token", async () => {
    const response = await chai.request(server)
      .post("/login")
      .send({ email: "9RqFP@example.com", password: "123456" });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token")
  });

})