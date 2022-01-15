import { Request, Response } from 'express';
import { pool } from '../db/config';
import { handleError } from '../utils/utils';
import isEmail from 'validator/lib/isEmail';
import jwt from 'jsonwebtoken';
const mysql = require('mysql')
class AuthController {
  static register (req: Request, res: Response) {
    const { username, email, password, profileImage } = req.body
    //validate params
    if (!username || !email || !password || !profileImage)
      return res.json({ error: 'please fill all of the fields' })
    if (!isEmail(email)) return res.json({ error: 'email is not valid' })
    if (password.length < 6)
      return res.json({ error: 'password must be at least 6 characters' })

    pool.getConnection(async (error: Error, connection: any) => {
      if (error) {
        return res.json({
          error: 'some unknown error occured while connecting to database'
        })
      }
      let sql =
        `INSERT INTO users(username,email,password,profileImage) VALUES(${mysql.escape(username)} , ${mysql.escape(email)}, ${mysql.escape(password)} , ${mysql.escape(profileImage)})`;

      connection.query(
        sql,
        (error2: any, results: any, fields: any) => {
          if (error2) {
            return res.json({ error: handleError(error2.sqlMessage, error2.errno) })
          }
          connection.destroy()
          const token = jwt.sign({email},process.env.JWT_SECRET as string,{expiresIn:'1h'})
          // jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaTZAZ21haWwuY29tIiwiaWF0IjoxNjQyMjQyODI0LCJleHAiOjE2NDIzMjkyMjR9.BQoiu6Vg9HB8OagshiDvX0cIhE60ZDeRRwhKEOqFjUY',
          // process.env.JWT_SECRET as string,(err,decoded)=>{
          //   if (err) throw err;
          //   console.log('decoded');
          //   console.log(decoded);
          // });
          return res.json({ token })
        }
      )
    })
  }

  static login(req:Request, res:Response){
    const {email, password} = req.body;
    if(!email || !password) return res.json({error: 'please fill all of the fields'})
    pool.getConnection(async (error: Error, connection: any) => {
      if (error) {
        return res.json({
          error: 'some unknown error occured while connecting to database'
        })
      }
      let sql =
        `SELECT email,userId FROM users WHERE email=${mysql.escape(email)} AND password=${mysql.escape(password)}`
      connection.query(
        sql,
        (error2: any, results: any, fields: any) => {
          if (error2) {
            console.log('error')
            return res.json({ error: handleError(error2.sqlMessage, error2.errno) })
          }
          //if we don't have any results returned
          if(!results.length) return res.json({error:"email or password is incorrect"})
          const {email, userId} = results[0];
          const token = jwt.sign({email},process.env.JWT_SECRET as string,{expiresIn:'1h'});
          connection.destroy();
          return res.json({ token, userData: { email: email,userId }});

        }
      )
    })

  }
}

export { AuthController }
