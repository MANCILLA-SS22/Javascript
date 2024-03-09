import { Router } from "express";
import { ManagerPost, Post } from "../utils/ManagerPost.js";
import { validatePost } from "../utils/validatePost.js";

const router = Router();
const manager = new ManagerPost("./data/post.json");

router.get("/", function(req, res){
  const posts = manager.getPosts();
  res.json({
    posts,
  });
});

router.post("/", validatePost, async function (req, res){
  const { userId, id, title, body } = req.body;
  const post = new Post(userId, id, title, body);

  try {
    await manager.savePost(post);
    res.json({
      message: "Post created",   
      post,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.delete("/:id", async function (req, res){
  const {id} = req.params;

  if (!id) {
    return res.json({error: "Id is required",});
  }

  try {
    await manager.deletePost(+id);
    res.json({message: "Post deleted",});

  }catch(error) {
    res.json({error: error,});
  }
});

export default router;
