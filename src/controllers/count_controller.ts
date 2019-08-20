import BaseController from "./base_controller";
import RedisStorage from "../storages/redis_storage";

class CountController extends BaseController {
    redisCountStorage: RedisStorage;

    constructor(){
        super();
        this.redisCountStorage = new RedisStorage('count');
    }

    public async processData(data: string): Promise<string> {
        return await this.redisCountStorage.get();
    }

}

export default CountController;