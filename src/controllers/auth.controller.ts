import { Request, Response } from 'express'
import { pool } from '../db/config'
import { handleError } from '../utils/utils'
import isEmail from 'validator/lib/isEmail'
class AuthController {
  static async register (req: Request, res: Response) {
    const { username, email, password, profileImage } = req.body
    const values = [username, email, password, profileImage]
    let mysqlErr: string | undefined
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
        'INSERT INTO users(username,email,password,profileImage) VALUES(?)'
      connection.query(
        sql,
        [values],
        (error2: any, results: any, fields: any) => {
          if (error2) {
            console.log('lalalal')
            return res.json({ error: handleError(error2.sqlMessage, error2.errno) })
          }
          connection.destroy()
          return res.json({ jwt: 'this is jwt' })
        }
      )
    })
  }
}

export { AuthController }
