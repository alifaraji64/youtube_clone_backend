import Router from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { VideoController } from "../controllers/video.controller";
import {isAuthorized} from "../utils/middleware"

const router = Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/userInfo', isAuthorized, UserController.fetchInfo);
router.post('/addProfileImage', isAuthorized, UserController.addProfileImage);
router.post('/addVideo', isAuthorized, VideoController.addVideo);
router.get('/getVideos', isAuthorized, VideoController.getVideos);

export{router}
