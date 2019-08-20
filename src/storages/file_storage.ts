import * as fs from "fs";
import ErrorMessage from "../error_message";

class FileStorage implements IStorage<string> {

    private fileName: string;

    constructor(fileName: string){
        this.fileName = fileName;
    }

    set(value: string): Promise<void> {
        return new Promise((res, rej) => {
            fs.writeFile(this.fileName, value, err => {
                if (err) {
                    rej(new ErrorMessage("Error occured when processing data!"));
                }else{
                    res();
                }
            })
        });
    }

    append(value: string): Promise<void> {
        return new Promise((res, rej) => {
            fs.appendFile(this.fileName, value, err => {
                if (err) {
                    rej(new ErrorMessage("Error occured when processing data!"));
                }else{
                    res();
                }
            }); 
        });
    }
    
    get(): Promise<string> {
        return new Promise((res, rej) => {
            fs.readFile(this.fileName, (err, data) => {
                if (err) {
                    rej(new ErrorMessage("Error occured when reading data!"));
                }else{
                    res(data.toString());
                }
            })
        });
    }
}

export default FileStorage;