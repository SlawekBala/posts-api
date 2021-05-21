import Posts from '../models/Posts'

exports.editPost = async (req, res) => { 
  
   const updatedPost = await Posts.query().patch({
    title: req.body.title,
    lead: req.body.lead,
    content: req.body.content
  }).findOne(req.params);

  console.log(updatedPost)
  res.json(req.body)
};