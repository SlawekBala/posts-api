import { v4 as uuidv4 } from 'uuid'
import Posts from '../models/Posts'

exports.addPost = async (req, res) => { 
  
  const addRecord = await Posts.query().insert({
    'id': uuidv4(),
    "title": req.body.title,
    'lead': req.body.lead,
    'content': req.body.content
  });

  console.log(req.body)
  res.json(req.body)
};