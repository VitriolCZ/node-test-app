import * as redis from 'redis';
import settings from '../settings';

class RedisStorage implements IStorage<string> {
    private client: redis.RedisClient;
    private key: string = '';

    constructor(key: string){
        this.key = key;
    }

    private async connect(){
        if(this.client){
            return;
        }

        return new Promise((res, rej) => {
            this.client = redis.createClient(settings.redisPort, settings.redisIP);

            this.client.on('connect', function (err) {
                res();
            });

            this.client.on('error', function (err) {
                rej(new Error('Error occured when connecting to redis server! ' + err.message));
            });

        })
    }

    async set(value: string): Promise<void> {
        await this.connect();
        this.client.set(this.key, value);
    }    
    
    append(value: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async get(): Promise<string> {
        await this.connect();
        return new Promise((res, rej) => {
            this.client.get(this.key, (err, val) => {
                if(err){
                    rej(err);
                }
                res(val);
            })
        });
    }

}

export default RedisStorage;