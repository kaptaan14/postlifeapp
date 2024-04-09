import express from "express";
import {commentPost, createPost, getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js"
import { verifyToken } from "../middlewares/auth.js";  


const router = express.Router();


router.get("/", verifyToken, getFeedPosts);
router.post("/", verifyToken, createPost);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comment", verifyToken, commentPost);


export default router;