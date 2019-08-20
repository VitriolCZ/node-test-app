import * as request from "supertest";
import * as express from "express";
import { router } from "../../../src/routes";

describe("HTTP GET /count", () => {
    it("Should return 200", done => {
        const app = express();
        app.use(router);
        request(app)
            .get("/count")
            .end((err, res) => {
                expect(res.status).toBe(200);
                done();
            });
    });
});