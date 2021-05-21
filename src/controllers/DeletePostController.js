import Posts from '../models/Posts'

exports.deletePost = async (req, res) => {

  const post = await Posts.query().findOne(req.params).delete();

  res.send(req.params);
  console.log(req.params);
  console.log(post, ' WAS DELETED');
};

exports.deletePosts = async (req, res) => {

  const post = await Posts.query().whereBetween('id', [req.params.uuidfrom, req.params.uuidto]).delete();

  res.send(req.params)
  console.log(req.params);
  console.log(post, ' WERE DELETED');
}