import { Request, Response } from 'express';
import { pool } from '../db/config';
import { handleError } from '../utils/error';
import isEmail from 'validator/lib/isEmail';
import jwt from 'jsonwebtoken';
const mysql = require('mysql')
class AuthController {
  static register (req: Request, res: Response) {
    const { username, email, password } = req.body;
    console.log(req.body);
    //validate params
    if (!username || !email || !password)
      return res.status(401).json({ error: 'please fill all of the fields' })
    if (!isEmail(email)) return res.status(401).json({ error: 'email is not valid' })
    if (password.length < 6)
      return res.status(401).json({ error: 'password must be at least 6 characters' })

    pool.getConnection(async (error: Error, connection: any) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'some unknown error occured while connecting to database'
        })
      }
      let sql =
        `INSERT INTO users(username,email,password) VALUES(${mysql.escape(username)} , ${mysql.escape(email)}, ${mysql.escape(password)})`;

      connection.query(
        sql,
        (error2: any, results: any, fields: any) => {
          if (error2) {
            return res.status(401).json({ error: handleError(error2.sqlMessage, error2.errno) })
          }
          connection.destroy()
          const token = jwt.sign({email, uid:results.insertId},process.env.JWT_SECRET as string,{expiresIn:'10d'})
          return res.status(200).json({ token })
        }
      )
    })
  }

  static login(req:Request, res:Response){
    const {username, password} = req.body;
    if(!username || !password) return res.status(401).json({error: 'please fill all of the fields'})
    pool.getConnection(async (error: Error, connection: any) => {
      if (error) {
        return res.status(401).json({
          error: 'some unknown error occured while connecting to database'
        })
      }
      let sql =
        `SELECT email,userId FROM users WHERE username=${mysql.escape(username)} AND password=${mysql.escape(password)}`
      connection.query(
        sql,
        (error2: any, results: any, fields: any) => {
          if (error2) {
            console.log('error')
            return res.status(401).json({ error: handleError(error2.sqlMessage, error2.errno) })
          }
          //if we don't have any results returned
          if(!results.length) return res.status(401).json({error:"email or password is incorrect"})
          const {email, userId} = results[0];
          const token = jwt.sign({email, uid:userId},process.env.JWT_SECRET as string,{expiresIn:'10d'});
          connection.destroy();
          return res.json({ token });
        }
      )
    })

  }
}

export { AuthController }
