import TrackController from "../../../src/controllers/track_controller";
import FileStorage from "../../../src/storages/file_storage";
import RedisStorage from "../../../src/storages/redis_storage";

let controller = new TrackController();
let dataFileStorage = new FileStorage("data.txt");
let redisCountStorage = new RedisStorage('count');
let inputData = `{"key":"value"}`;
let inputDataCount = `{"key":"value","count":5}`;

describe("Track controller", () => {
    it("Should append input data to file", async done => {

        await dataFileStorage.set("");

        await controller.processData(inputData);

        let value = await dataFileStorage.get();

        expect(value).toBe(inputData);

        await dataFileStorage.set("");

        done();
    });

    it("Should increment key count in redis DB", async done => {

        let valueBefore = await redisCountStorage.get();

        await controller.processData(inputDataCount);

        let valueAfter = await redisCountStorage.get();
        let parsedData = JSON.parse(inputDataCount);

        expect(parseInt(valueAfter)).toBe(parseInt(valueBefore) + parsedData.count);

        done();
    });
});