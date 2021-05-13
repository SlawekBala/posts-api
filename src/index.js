import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import express from 'express'
import cookieParser from 'cookie-parser'
import { v4 as uuidv4 } from 'uuid'

const PagesController = require('./controllers/PagesController');
const UsersController = require('./controllers/UsersController');

import User from './models/User'
import Posts from './models/Posts'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');


app.get('/', PagesController.home)

app.get('/api/users', /*authenticate,*/ async (req, res) => {
  //const users = [{ id:1, name: 'Imie Usera'}]
  const users = await User.query()
  /*.withGraphFetched('Posts')*/

  res.send(users)
})

app.get('/api/posts', /*authenticate,*/ async (req, res) => {
  
  const posts = await Posts.query()

  res.send(posts)
})

app.get('/api/posts/:id', /*authenticate,*/ async (req, res) => {
  //const users = [{ id:1, name: 'Imie Usera'}]
  
  const post = await Posts.query().findById(req.params);
  /*.withGraphFetched('Posts')*/

  res.send(post)
})

//ADD POSTS
app.post('/api/add/record', async (req, res) => { 
  
  const addRecord = await Posts.query().insert({
    'id': uuidv4(),
    "title": req.body.title,
    'lead': req.body.lead,
    'content': req.body.content
  });

  console.log(req.body)
  res.json(req.body)
})

//EDIT POST
app.put('/api/edit/record/:id', async (req, res) => { 
  
  const addRecord = await Posts.query()
  .findById(req.params)
  .patch({
    "title": req.body.title,
    'lead': req.body.lead,
    'content': req.body.content
  });

  console.log(req.body)
  res.json(req.body)
})



app.delete('/api/deleterecord/:id', /*authenticate,*/ async (req, res) => {
  const post = await Posts.query().deleteById(req.params);
  /*.withGraphFetched('Posts')*/

  console.log(post, ' WAS DELETED')
})

app.delete('/api/deleterecord/:from/:to', /*authenticate,*/ async (req, res) => {
  let from = parseInt(req.params.from);
  let to = parseInt(req.params.to);

  const posts = await Posts.query()
  .delete().where('id >=', from, 'and id <=', to);

  console.log(posts, ' WERE DELETED')
})






app.get('/api/users/:id', /*authenticate,*/ async (req, res) => {
  //const users = [{ id:1, name: 'Imie Usera'}]
  
  const user = await User.query().findById(req.params);
  /*.withGraphFetched('Posts')*/

  res.send(user)
})

app.post('/api/auth/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  //const validPassword = await bcrypt.compare(password, user[0].password)

  const accessToken = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET, { expiresIn: 86400 })
  const refreshToken = jwt.sign({ id: 1 }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 525600 })

  res.cookie('JWT', accessToken, {
    maxAge: 86400000,
    httpOnly: true
  })

  res.send({ accessToken, refreshToken })
})


app.post('/api/auth/refresh', async (req, res) => {
  const refreshToken = req.body.token

  if (!refreshToken) {
    return res.status(401)
  }

  try{
    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  } catch(err) {
    return res.sendStatus(403)
  }

  const accessToken = jwt.sign({ id:1}, process.env.TOKEN_SECRET, {expiresIn: 86400})

  res.send({ accessToken })
})

function authenticate(req, res, next) {
  // const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]
  const token = req.cookies.JWT

  if (token === null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
    if (err) return res.sendStatus(403)

    req.user = user
    next()
  })
}

app.listen(3000, () => {
  console.log('Serwer działa')
})