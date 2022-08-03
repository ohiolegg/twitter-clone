
import UserModel, { UserModelInterface } from "../models/UserModel"
import express from 'express'
import TweetModel, { TweetModelDocumentInterface } from "../models/TweetModel"
import CommentModel from "../models/CommentModel"

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
            const comments = await CommentModel.find({tweet: id}).populate('tweet').populate('user').exec()
            
            if(!tweet){
                res.status(404).json({
                    message: "Couldn't find the tweet"
                })
                return
            }

            res.json({
                tweet,
                comments
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
                    user: user._id,
                    likes: 0
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

    async like(req: express.Request, res: express.Response): Promise<void> {
      try {
        const user = req.user as UserModelInterface;

        if (user) {
          const tweetId = req.params.id
          
          if(user.likedPosts.find(item => item.toString() === tweetId)){
            user.likedPosts.forEach((item, i) => {
              if(item.toString() === tweetId){
                UserModel.findByIdAndUpdate({
                  _id: user._id
                },{
                  $pull: { 'likedPosts': user.likedPosts[i]}
                },{
                  returnDocument: 'after'
                }, (err, doc) => {
                  if(err){
                    return res.status(500).json({
                        message: "Couldn't like the tweet"
                    }) 
                  }
      
                  if(!doc){
                      return res.status(404).json({
                          message: 'Tweet was not found'
                      })
                  }
                })
              }
            })

            TweetModel.findByIdAndUpdate({
              _id: tweetId
            }, {
              $inc: {likes: -1}
            },{
              returnDocument: 'after'
            }, (err, doc) => {
              if(err){
                return res.status(500).json({
                    message: "Couldn't like the tweet"
                }) 
              }
  
              if(!doc){
                  return res.status(404).json({
                      message: 'Tweet was not found'
                  })
              }
            })

            res.send();
          }

          if(!user.likedPosts.find(item => item.toString() === tweetId)){
            UserModel.findByIdAndUpdate({
              _id: user._id
            },{
              $push: { 'likedPosts': tweetId}
            },{
              returnDocument: 'after'
            }, (err, doc) => {
              if(err){
                return res.status(500).json({
                    message: "Couldn't like the tweet"
                }) 
              }
  
              if(!doc){
                  return res.status(404).json({
                      message: 'Tweet was not found'
                  })
              }
            })

            TweetModel.findByIdAndUpdate({
              _id: tweetId
            }, {
              $inc: {likes: 1}
            },{
              returnDocument: 'after'
            }, (err, doc) => {
              if(err){
                return res.status(500).json({
                    message: "Couldn't like the tweet"
                }) 
              }
  
              if(!doc){
                  return res.status(404).json({
                      message: 'Tweet was not found'
                  })
              }
            })

            res.send();
          }
        }
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: "Couldn't like the tweet",
        });
      }
    }

    async marked(req: express.Request, res: express.Response): Promise<void> {
      try {
        const user = req.user as UserModelInterface;

        if (user) {
          const tweetId = req.params.id
          
          if(user.markedTweets.find(item => item.toString() === tweetId)){
            user.markedTweets.forEach((item, i) => {
              if(item.toString() === tweetId){
                UserModel.findByIdAndUpdate({
                  _id: user._id
                },{
                  $pull: { 'markedTweets': user.markedTweets[i]}
                },{
                  returnDocument: 'after'
                }, (err, doc) => {
                  if(err){
                    return res.status(500).json({
                        message: "Couldn't like the tweet"
                    }) 
                  }
      
                  if(!doc){
                      return res.status(404).json({
                          message: 'Tweet was not found'
                      })
                  }
                })
              }
            })

            res.send({type: 'unmarked', _id: tweetId});
          }

          if(!user.markedTweets.find(item => item.toString() === tweetId)){
            UserModel.findByIdAndUpdate({
              _id: user._id
            },{
              $push: { 'markedTweets': tweetId}
            },{
              returnDocument: 'after'
            }, (err, doc) => {
              if(err){
                return res.status(500).json({
                    message: "Couldn't like the tweet"
                }) 
              }
  
              if(!doc){
                  return res.status(404).json({
                      message: 'Tweet was not found'
                  })
              }
            })
            
            res.send({type: 'mark', _id: tweetId});
          }
        }
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: "Couldn't like the tweet",
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

    async addComment(req: express.Request, res: express.Response): Promise<void> {
  
      try {
        const user = req.user as UserModelInterface;
        if (user) {
          const tweetId = req.params.id;
  
          const doc = new CommentModel({
            text: req.body.text,
            user,
            tweet: tweetId
          })

          const comment = await doc.save()

          res.json(
            comment
          )

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