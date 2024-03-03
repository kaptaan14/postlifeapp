import express from "express";
import {getUser, getUserFriends,addremoveFriend} from "../controllers/users.js"
import {verifyToken} from "../middlewares/auth.js"


const router = express.Router();

//read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);


//update
router.patch("/:id/:friendId",verifyToken ,addremoveFriend);


export default router;
