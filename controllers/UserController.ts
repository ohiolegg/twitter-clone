import UserModel, { UserModelDocumentInterface, UserModelInterface } from "../models/UserModel"
import express, { request } from 'express'
import { generateMD5 } from "../utils/generateHash"
import { sendEmail } from "../utils/sendEmail"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import TweetModel from "../models/TweetModel"

class UserController {
    async index(req: express.Request, res: express.Response) : Promise<void> {
        try{
            const users = await UserModel.find().exec()

            res.json({
                users
            })
            
        }catch(err){
            res.json({
                status: 'error',
                message: JSON.stringify(err)
            })
        }
    }

    async show(req: express.Request, res: express.Response) : Promise<void> {
        try{
            const id = req.params.id
            if(!id){
                res.status(400).json({
                    message: "Couldn't find the user"
                })
                return
            }
            const user = await UserModel.findById(id).populate('tweets').exec()
            const tweets = await TweetModel.find({user: id}).exec()

            const likedTweets = await TweetModel.find({
                _id: {
                    $in : user?.likedPosts
                }
            }).exec()

            if(!user){
                res.status(404).json({
                    message: "Couldn't find the user"
                })
                return
            }

            res.json({
                user,
                tweets,
                likedTweets
            })
            
        }catch(err){
            res.status(500).json({
                message: "Couldn't find the user"
            })
        }
    }

    async create(req:express.Request, res: express.Response){
        try{

            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const randomString = Math.random().toString()

            const data = new UserModel({
                email: req.body.email,
                username: req.body.username,
                fullname: req.body.fullname,
                password: hash,
                confirmHash: generateMD5(process.env.SECRET_KEY + randomString || randomString)
            })

            const user = await data.save()

            sendEmail({
                emailFrom: 'admin@twitter.com',
                emailTo: data.email,
                subject: 'Confirm your email for Twitter',
                html: `To confirm your email, follow <a href = "http://localhost:3000/user/activate/${data.confirmHash}">that link</a> `
            }, (err: Error | null) => {
                if(err){
                    res.status(500).json({
                        message: "Couldn't do the registration"
                    })
                }else{
                    res.json({
                        user
                    })
                }

            })

        } catch(e){
            res.status(500).json({
                message: "Couldn't do the registration"
            })
        }
    }

    async update(req:express.Request, res: express.Response){
        try{

            const userId = req.params.id

            await UserModel.findOneAndUpdate({
                _id: userId
            }, {
                fullname: req.body.fullname,
                location: req.body.location,
                about: req.body.about,
                website: req.body.website,    
                avatarUrl: req.body.avatarUrl, 
                bannerUrl: req.body.bannerUrl,
            })

            res.json({
                success: true
            })
        } catch(e){
            res.status(500).json({
                message: "Couldn't do the registration"
            })
        }
    }

    async verify(req: express.Request, res: express.Response) : Promise<void> {
        try{
            const hash = req.query.hash

            if(!hash){
                res.status(400).json({
                    message: "There is no hash"
                })
            }

            const user = await UserModel.findOne({confirmHash: hash}).exec()

            if(user){
                user.confirmed = true
                user.save()
                res.json(
                    {
                    ...user,
                    token:  jwt.sign({ data: user.toJSON() }, process.env.SECRET_KEY || '123', {
                        expiresIn: '30 days',
                      })
                    }          
                )   
            }
            
        }catch(err){
            res.status(500).json({
                message: "There is no hash"
            })
        }
    }

    async afterLogin(req: express.Request, res: express.Response) : Promise<void> {
        try{
            const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined
            res.json({
                ...user,
                token: jwt.sign({data: req.user}, process.env.SECRET_KEY || '123', {expiresIn: '30d'})
            })
            
        }catch(err){
            res.status(500).json({
                message: "There is no hash"
            })
        }
    }

    async getUserInfo(req: express.Request, res: express.Response) : Promise<void> {
        try{
            const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined
            res.json({
                user
            })
            
        }catch(err){
            res.status(500).json({
                message: "There is no hash"
            })
        }
    }
}

export const UserCtrl = new UserController()