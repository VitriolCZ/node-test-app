import * as fs from "fs";
import FileStorage from "../../src/storages/file_storage";

let fileName = 'test.txt';
let testValue = "testVal";

describe("File storage", () => {
    it("Should create file, write to it and read value.", async done => {

        if(fs.existsSync(fileName)){
            fs.unlinkSync(fileName);
        }

        let fileStorage = new FileStorage(fileName);

        await fileStorage.set(testValue);

        let value = await fileStorage.get();

        expect(value).toBe(testValue);

        fs.unlinkSync(fileName);

        done();

    });

    it("Should create file and apend to it", async done => {
        let fileStorage = new FileStorage(fileName);

        await fileStorage.append(testValue);
        await fileStorage.append(testValue);

        let value = await fileStorage.get();

        expect(value).toBe(testValue + testValue);

        fs.unlinkSync(fileName);

        done();
    });
});

