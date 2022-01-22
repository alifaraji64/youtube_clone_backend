import { Request, Response } from 'express';
import { pool } from '../db/config';
import { handleError } from '../utils/error';
const mysql = require('mysql');
import { initializeApp,cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getStorage } from "firebase-admin/storage";
initializeApp({
  credential: cert(require('../../firebase_cred.json')),
  storageBucket:'https://console.firebase.google.com/project/twitter-clone-8f3c6/storage/twitter-clone-8f3c6.appspot.com/files'

});
const db = getFirestore();
const bucket = getStorage().bucket('ttt');
class UserController {

    static fetchInfo(req:Request, res:Response){
        console.log('hello from controller');
        //we set them in the middleware from jwt decoding
        const {email, uid} = res.locals;
        pool.getConnection( (error: Error, connection: any) => {
            if (error)
              return res.status(500).json({error: 'some unknown error occured while connecting to database'})

            let sql =
              `SELECT * FROM users WHERE userId=${mysql.escape(uid)}`;
            connection.query(
              sql,
              (error2: any, results: any, fields: any) => {
                if (error2) {
                  return res.status(401).json({ error: handleError(error2.sqlMessage, error2.errno) })
                }
                connection.destroy();
                res.status(200).json(results[0]);

              }
            )
          })


    }

    static async addProfileImage(req:Request,res:Response){
      const profileImage = req.body.profileImage;
      const { uid } = res.locals;
      pool.getConnection((error:Error,connection:any)=>{
        if (error)
              return res.status(500).json({error: 'some unknown error occured while connecting to database'});
        const sql = `UPDATE users SET profileImage=${mysql.escape(profileImage)} WHERE userId=${mysql.escape(uid)}`;
        connection.query(sql,
          (error2:any, results:any, fields:any)=>{
          if(error2) return res.status(401).json({ error: handleError(error2.sqlMessage, error2.errno) })
          connection.destroy();
          return res.sendStatus(200);
        })
      })

    }
}

export { UserController }
