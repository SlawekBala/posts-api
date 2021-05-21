import Posts from '../models/Posts'

exports.editPost = async (req, res) => { 
  
  // const editRecord = await Posts.query().patchAndFetchById(req.params,
  //   {  title: req.body.title,
  //       lead: req.body.lead,
  //       content: req.body.content
  //   });
  // .patch({
  //   title: req.body.title,
  //   lead: req.body.lead,
  //   content: req.body.content
  // }).findOne(req.params);

  const findPost = await Posts.query().findOne(req.params);
  const updatedPost = findPost.$query().patch({
    title: req.body.title,
    lead: req.body.lead,
    content: req.body.content
  });

  console.log(findPost)
  console.log(updatedPost)
  res.json(req.body)
};