import BaseController from "./base_controller";
import FileStorage from "../storages/file_storage";
import ErrorMessage from "../error_message";
import RedisStorage from "../storages/redis_storage";

class TrackController extends BaseController {
    private redisCountStorage: RedisStorage;
    private dataFileSorage: FileStorage;

    constructor(){
        super();

        this.redisCountStorage = new RedisStorage('count');
        this.dataFileSorage = new FileStorage("data.txt");
    }
    
    public async processData(data: string): Promise<void> {
        let parsedInput: any;
        try{
            parsedInput = JSON.parse(data);
        }catch(e){
            throw new ErrorMessage("Input is not valid JSON! " + e.message);
        }

        if(parsedInput.count){
            let count = parseInt(parsedInput.count);
            if(isNaN(count)){
                throw new ErrorMessage("Count parameter is not valid integer!");
            }

            let actualCount = parseInt(await this.redisCountStorage.get());

            await this.redisCountStorage.set((actualCount + count) + '');
        }

        await this.dataFileSorage.append(data);
    }

}

export default TrackController;