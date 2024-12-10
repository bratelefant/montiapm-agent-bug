import assert from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import { insertLink } from "../server/main";

if (Meteor.isServer) {
  chai.use(chaiHttp);
  describe("GET /links", function () {
    it("gets the links", async function () {
      await insertLink({
        title: "Do the Tutorial",
        url: "https://www.meteor.com/tutorials/react/creating-an-app",
      });
      const res = await chai.request("http://localhost:3000").get("/links");
      console.log(res.body);

      assert.strictEqual(res.status, 200);
    });
  });
}
