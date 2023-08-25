```js
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.route('/').get(example);

function example(_req: Request, res:Response){
    try{
        res.status(200).json({success:true})
    }catch(e:any){
        console.log(e.message);
    }
}
```
