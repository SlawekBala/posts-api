import Posts from '../models/Posts'

exports.getAllPosts = async (req, res) => {
  
  const posts = await Posts.query()

  res.send(posts)
};

exports.getPost = async (req, res) => {

  const post = await Posts.query().findOne(req.params);

  res.send(post)
};