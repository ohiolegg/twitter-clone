import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import { TweetCtrl } from './controllers/TweetController'
import { UserCtrl } from './controllers/UserController'
import { passport } from './core/passport'
import handleValidationErrors from './utils/handleValidationErrors'
import { addCommentValidation, createTweetValidation, registerValidation, updateProfileValidation } from './validations'
import cors from 'cors'
import multer from 'multer'
import bodyParser from 'body-parser'
import { UploadCtrl } from './controllers/UploadController'

mongoose.connect(
    'mongodb+srv://admin69:admin69@cluster0.jm8os.mongodb.net/?retryWrites=true&w=majority'
    ).then(() => console.log('DB ok'))
    .catch(err => console.log('DB error: ', err))

const app = express()

app.use(passport.initialize())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors())

const storage = multer.memoryStorage()
const upload = multer({storage})

app.get('/users', UserCtrl.index)
app.get('/users/me', passport.authenticate('jwt', { session:false}), UserCtrl.getUserInfo)
app.get('/users/:id', UserCtrl.show)

app.get('/tweets', TweetCtrl.index)
app.get('/tweets/:id', TweetCtrl.show)
app.get('/tweets/user/:id', TweetCtrl.getUserTweets)
app.delete('/tweets/:id', passport.authenticate('jwt', { session:false}), TweetCtrl.delete)
app.post('/tweets', passport.authenticate('jwt', { session:false}), createTweetValidation, handleValidationErrors, TweetCtrl.create)
app.patch('/tweets/:id', passport.authenticate('jwt', { session:false}), createTweetValidation, handleValidationErrors, TweetCtrl.update)
app.patch('/likes/:id', passport.authenticate('jwt', { session:false}), TweetCtrl.like)
app.patch('/marked/:id', passport.authenticate('jwt', { session:false}), TweetCtrl.marked)
app.post('/tweets/comment/:id', passport.authenticate('jwt', { session:false}), addCommentValidation, handleValidationErrors, TweetCtrl.addComment)

app.post('/auth/signup', registerValidation, handleValidationErrors, UserCtrl.create)
app.get('/auth/verify', UserCtrl.verify)
app.post('/auth/signin', passport.authenticate('local', { session:false}), UserCtrl.afterLogin)
app.patch('/auth/:id', passport.authenticate('jwt', { session:false}), UserCtrl.update)
/* app.patch('/users', UserCtrl.update)
app.delete('/users', UserCtrl.delete)
 */

app.post('/upload', upload.single('image'), UploadCtrl.upload)

app.listen(process.env.PORT, () : void => {
    console.log('Server OK')
})