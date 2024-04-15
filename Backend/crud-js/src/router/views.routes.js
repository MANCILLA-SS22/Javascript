import { Router } from "express";
import postDao from "../daos/post.dao.js";
import userDao from "../daos/user.dao.js";

const router = Router();

router.get("/", async (req, res) => {
    const posts = await postDao.findPosts();
    const users = await userDao.findUsers();

    res.render("index", { posts, users });
});

export default router;