const Post = require('../models/Post');

exports.post_get_all = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts)
  }catch(error){
    res.json({message: error})
  }
};

exports.post_create = async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.send(savedPost)
  }catch(error){
    res.status(500).json({status: 'failed', message: error.message })
  }
};

exports.post_find_one = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post)
  }catch(error){
    res.status(404).json({status: 'failed', message: error.message })
  }
};

exports.post_update = async (req, res) => {
  try {
    const post = await Post.updateOne({_id: req.params.postId},
      {$set: req.body}
    );
    res.json({message:"Success ", body: post})
  }catch(error){
    res.status(404).json({status: 'failed', message: error.message })
  }
};

exports.post_delete = async (req, res) => {
  try {
    const post = await Post.deleteOne({_id: req.params.postId});
    res.json(post)
  }catch(error){
    res.status(404).json({status: 'failed', message: error.message })
  }
};

