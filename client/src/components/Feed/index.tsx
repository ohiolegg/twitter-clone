import { CircularProgress, Paper, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import { useHomeStyles } from '../../pages/Home/theme'
import { AddTweetForm } from '../AddTweetForm'
import { Tweet } from '../Tweet'

interface FeedProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const Feed: React.FC<FeedProps> = ({
  classes
}: FeedProps): React.ReactElement | null=> {

  const {tweetsItems, loadingState} = useAppSelector(state => state.tweets)
  const data = useAppSelector(state => state.auth.data)

  return (
    <>
        <Paper className={classes.tweetsHeader} variant="outlined">
              <Typography variant="h6">Главная</Typography>
            </Paper>
            <Paper>
              <div className={classes.addForm}>
                <AddTweetForm classes={classes} />
              </div>
              <div className={classes.addFormBottomLine} />
        </Paper>
        {loadingState === 'LOADING' ? <div className={classes.tweetsCentered}><CircularProgress /> </div> : tweetsItems.map(tweet => 
        {

          return(
              <Tweet
                key = {tweet._id}
                classes={classes} 
                isEditable = {String(data?._id) === tweet.user._id}
                liked = {!data?.likedPosts ? false : Boolean(data?.likedPosts.find(item => String(item) === tweet._id))}
                marked = {!data?.markedTweets ? false : Boolean(data?.markedTweets.find(item => item._id === tweet._id))}
                {...tweet}/>
              )})
        }
    </>
  );
};
