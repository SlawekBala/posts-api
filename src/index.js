import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import express from 'express'
import cookieParser from 'cookie-parser'

const LoginController = require('./controllers/LoginController');
const PagesController = require('./controllers/PagesController');
const ShowUsersController = require('./controllers/ShowUsersController');
const ShowPostsController = require('./controllers/ShowPostsController');
const AddPostController = require('./controllers/AddPostController');
const EditPostController = require('./controllers/EditPostController');
const DeletePostController = require('./controllers/DeletePostController');

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

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


app.get('/', PagesController.home)

app.post('/api/auth/login', LoginController.login);

app.post('/api/auth/refresh', LoginController.refresh);

app.get('/api/users', authenticate, ShowUsersController.getAllUsers);

app.get('/api/users/:id', authenticate, ShowUsersController.getUser);

app.get('/api/posts', authenticate, ShowPostsController.getAllPosts);

app.get('/api/posts/:id', authenticate, ShowPostsController.getPost);

app.post('/api/add/record', authenticate, AddPostController.addPost);

app.patch('/api/edit/record/:id', /*authenticate,*/ EditPostController.editPost);

app.delete('/api/deleterecord/:id', authenticate, DeletePostController.deletePost);

app.delete('/api/deleterecords/:uuidfrom/:uuidto', authenticate, DeletePostController.deletePosts);

app.listen(3000, () => {
  console.log('Serwer działa')
})