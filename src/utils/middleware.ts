import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
function isAuthorized(req:Request,res:Response,next:Function){
    if(!req.headers.authorization) return res.status(401).json({error:'user not logged in'})
    const token = req.headers.authorization;
    console.log('token');

    console.log(token);

    jwt.verify(token,
          process.env.JWT_SECRET as string,(err,decoded:any)=>{
            if (err) return res.status(401).json({error:'token is invalid'});
            console.log('decoded...');
            console.log(decoded);
            const {email,uid} = decoded;
            console.log(email,uid);
            res.locals.email=email;
            res.locals.uid=uid.toString();
            next();
          });

}
export {isAuthorized}