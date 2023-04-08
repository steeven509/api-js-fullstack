//Je vais travailer avec mon base de données pour ça je fais appel a post model
const PostModel = require('../models/post.model')

//GET - 
module.exports.getPost = async (req, res) => {
   //On stock la reponse du serveur au variable post 
   const posts = await PostModel.find()
   res.status(200).json(posts)
}

//POST -
module.exports.setPost = async (req, res) => {
    //Message de security je verifie SI il y a bien un message
    if (!req.body.message) {
       res.status(400).json({ message: "Il faut entrez un message" });
    }

    const post = await PostModel.create({
        message: req.body.message,
        author: req.body.author
    })
    console.log(req.body);
    res.status(200).json(post);
}

// PUT -
module.exports.editPost = async (req, res) => {
   //On stock l'id du post dans la varible post  
   const post = await PostModel.findById(req.params.id)

   if (!post) {
      res.status(400).json({ message: "Ce post n'exist pas" });
   }
   const updatePost = await PostModel.findByIdAndUpdate(post, req.body, { new: true })
   res.status(200).json(updatePost);
   console.log(req.body);
}

// DELETE -
module.exports.deletePost = async (req, res) => {
   const post = await PostModel.findById(req.params.id)
   // post.deleteOne();

   if (!post) {
      res.status(400).json({ message: "Ce post n'exist pas" });
   }
   await post.deleteOne({ _id: req.params.id })
   res.status(200).json("Message deleted " + req.params.id);
}

// PATCHES - 
module.exports.likePost = async (req, res) => {
   try {
      await PostModel.findByIdAndUpdate(
         req.params.id,
         { $addToSet: { likers: req.body.userId }},
         { new: true }
         ).then((data) => res.status(200).send(data))
   } catch (error) {
      res.status(400).json(error)
   }
}

module.exports.dislikePost = async (req, res) => {
   try {
      await PostModel.findByIdAndUpdate(
         req.params.id,
         { $pull: { likers: req.body.userId }},
         { new: true }
         ).then((data) => res.status(200).send(data))
   } catch (error) {
      res.status(400).json(error)
   }
}