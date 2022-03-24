import {Request,Response} from "express"
import { parse } from "path";
import { pool } from '../db/config';
import { handleError } from "../utils/error";
const mysql = require('mysql');
class VideoController{

    static addVideo(req:Request, res:Response){
        const {thumbnailUrl, videoUrl, userId} = req.body;
        pool.getConnection((error:any,connection:any)=>{
            if(error) return res.status(500).json({error: 'some unknown error occured while connecting to database'});

            const sql = `INSERT INTO videos (videoUrl,thumbnailUrl,userId) VALUES(${mysql.escape(videoUrl)},${mysql.escape(thumbnailUrl)},${mysql.escape(userId)})`

            connection.query(sql,(error2:any,results:any,fields:any)=>{
                if(error2) return res.status(401).json({ error: handleError(error2.sqlMessage, error2.errno) })
                connection.destroy();
                return res.sendStatus(200);
            })

        })
    }

    static getVideos(req:Request, res:Response){
        const uid = req.headers.uid as string;
        pool.getConnection((error:any,connection:any)=>{
            if(error) return res.status(500).json({error: 'some unknown error occured while connecting to database'});

            const sql = `SELECT * FROM videos WHERE userId=${mysql.escape(parseInt(uid))}`;
            console.log(uid);

            connection.query(sql,(error2:any,results:any,fields:any)=>{
                if(error2) return res.status(401).json({ error: handleError(error2.sqlMessage, error2.errno) })
                res.status(200).json({videos:results});
                connection.destroy();
            })

        })
    }

    static deleteVideo(req:Request, res:Response){
        const videoId = req.body.videoId;
        pool.getConnection((error:any,connection:any)=>{
            if(error) return res.status(500).json({error: 'some unknown error occured while connecting to database'});
            const sql = `DELETE FROM videos WHERE videoId=${ mysql.escape(videoId) }`
            connection.query(sql,(error2:any,results:any,fields:any)=>{
                if(error2) return res.status(401).json({ error: handleError(error2.sqlMessage, error2.errno) })
                connection.destroy();
                return res.sendStatus(200);
            })

        })
    }
}
export{VideoController}