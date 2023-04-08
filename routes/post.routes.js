const express = require('express');
const router = express.Router();
const { 
    setPost, 
    getPost, 
    editPost, 
    deletePost,
    likePost,
    dislikePost
 } = require('../controllers/post.controllers');

router.get("/", getPost)
router.post("/", setPost);
router.put("/:id", editPost);
router.delete("/:id", deletePost);
// PATCH - R'ajouter tout un serie de donnees dans la db 
router.patch("/like-post/:id", likePost);
router.patch("/dislike-post/:id", dislikePost);

module.exports = router;