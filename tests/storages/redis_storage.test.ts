import RedisStorage from "../../src/storages/redis_storage";


describe("Redis storage", () => {
    it("Should write and read value", async done => {

        let key = "testKey";
        let testValue = 'testValue';
        let redisStorage = new RedisStorage(key);

        await redisStorage.set(testValue);
        let value = await redisStorage.get();

        expect(value).toBe(testValue);

        done();

    });
});