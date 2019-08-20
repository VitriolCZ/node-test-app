import CountController from "../../../src/controllers/count_controller";


describe("Count controller", () => {
    it("Should return count from redis DB", async done => {
        let controller = new CountController();
        let data = parseInt(await controller.processData(''));

        expect(data).not.toBeNaN();
        expect(data).toBeGreaterThanOrEqual(0);

        done();
    });
});