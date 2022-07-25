import { UserModelInterface } from "../models/UserModel"
import express from 'express'
import TweetModel, { TweetModelDocumentInterface, TweetModelInterface } from "../models/TweetModel"

class TweetController {
    async index(req: express.Request, res: express.Response) : Promise<void> {
        try{
            const tweets = await TweetModel.find().sort({'createdAt': -1}).populate('user').exec()
            res.json({
                tweets
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
                    message: "Couldn't find the tweet"
                })
                return
            }
            const tweet = await TweetModel.findById(id).populate('user').exec()
            
            if(!tweet){
                res.status(404).json({
                    message: "Couldn't find the tweet"
                })
                return
            }

            res.json({
                tweet
            })
            
        }catch(err){
            res.status(500).json({
                message: "Couldn't find the tweet"
            })
        }
    }

    async getUserTweets(req: express.Request, res: express.Response) : Promise<void> {
      try{
          const userId = req.params.id
          if(!userId){
              res.status(400).json({
                  message: "Couldn't find the user"
              })
              return
          }
          const tweets = await TweetModel.find({user: userId}).sort({'createdAt': -1}).populate('user').exec()
          
          if(!tweets){
              res.status(404).json({
                  message: "Couldn't find the tweet"
              })
              return
          }

          res.json({
              tweets
          })
          
      }catch(err){
          res.status(500).json({
              message: "Couldn't find the tweet"
          })
      }
    }

    async create(req:express.Request, res: express.Response){
        try{
            const user = req.user as UserModelInterface

            if(user){
                const data : any = new TweetModel({
                    text: req.body.text,
                    images: req.body.images,
                    user: user._id
                })

                const tweet = await data.save()

                user.tweets!.push(tweet._id)
                
                res.json(await tweet.populate('user'))
            }
        } catch(e){
            res.status(500).json({
                message: "Couldn't create the tweet"
            })
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const user = req.user as UserModelInterface;
    
        try {
          if (user) {
            const tweetId = req.params.id;
    
            const tweet = await TweetModel.findById(tweetId);
    
            if (tweet) {
              if (String(tweet.user._id) === String(user._id)) {
                tweet.remove();
                res.send();
              } else {
                res.status(403).send();
              }
            } else {
              res.status(404).send();
            }
          }
        } catch (error) {
          res.status(500).json({
            status: 'error',
            message: error,
          });
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const user = req.user as UserModelInterface;
    
        try {
          if (user) {
            const tweetId = req.params.id;
    
            const tweet = await TweetModel.findById(tweetId);
    
            if (tweet) {
              if (String(tweet.user._id) === String(user._id)) {
                tweet.text = req.body.text
                await tweet.save()
                res.send();
              } else {
                res.status(403).send();
              }
            } else {
              res.status(404).send();
            }
          }
        } catch (error) {
          res.status(500).json({
            status: 'error',
            message: error,
          });
        }
    }
    
}

export const TweetCtrl = new TweetController()