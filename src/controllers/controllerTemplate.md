```js
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.route('/').get(example);

function example(_req: Router, res:Request){
    try{
        res.status(200).json({success:true})
    }catch(e:any){
        console.log(e.message);
    }
}
```
