import { Request, Response } from "express";
import ErrorMessage from "../error_message";

abstract class BaseController {

    public abstract async processData(data: any): Promise<string | void>;

    public async process(req: Request, res: Response): Promise<void>
    {
        let processed: string;
        try{
            processed = <string> await this.processData(req.body);
        }catch(e){
            if(e instanceof ErrorMessage){
                processed = e.message;
            }else{
                processed = 'Error occurred!';
            }
        }

        if(processed){
            res.send(Buffer.from(processed));
        }
        
        res.end();
    }

}

export default BaseController;