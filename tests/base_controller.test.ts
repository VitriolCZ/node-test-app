import * as express from "express";
import * as request from "supertest";

import BaseController from "../src/controllers/base_controller";
import ErrorMessage from "../src/error_message";


describe("Base controller process", () => {
    it("Should return test data", done => {
        const app = express();
        const testData = 'testData';
        app.use(express.text());
        app.post("/", (req, res) => (new TestController).process(req, res));

        request(app)
        .post('/')
        .set('Content-Type', 'text/plain')
        .send(testData)
        .end((err, res) => {
            expect(res.body.toString()).toBe(testData);
            done();
        });
    });

    it("Should return unknown error message", done => {
        const app = express();
        app.use(express.text());
        app.post("/", (req, res) => (new TestErrorController).process(req, res));

        request(app)
        .post('/')
        .end((err, res) => {
            expect(res.body.toString()).toBe('Error occurred!');
            done();
        });
    });

    it("Should return known error message", done => {
        const app = express();
        app.use(express.text());
        app.post("/", (req, res) => (new TestErrorMessageController).process(req, res));

        request(app)
        .post('/')
        .end((err, res) => {
            expect(res.body.toString()).toBe('An error occurred!');
            done();
        });
    });
});

class TestController extends BaseController {

    public async processData(data: string): Promise<string | void> {
        return data;
    }

}

class TestErrorController extends BaseController {

    public async processData(data: string): Promise<string | void> {
        throw new Error();
    }

}

class TestErrorMessageController extends BaseController {

    public async processData(data: string): Promise<string | void> {
        throw new ErrorMessage('An error occurred!');
    }

}