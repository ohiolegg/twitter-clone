//@ts-nocheck
import { CircularProgress, Paper, Typography } from '@mui/material';
import React from 'react'
import { useAppSelector } from '../../hooks/redux';
import { Tweet as TweetType } from '../../redux/slices/state';
import { useHomeStyles } from '../../pages/Home/theme';
import { Tweet } from '../../components/Tweet'

interface MarkedProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const MarkedTweets: React.FC<MarkedProps> = ({
  classes
}: MarkedProps): React.ReactElement | null=> {

  const data = useAppSelector(state => state.auth.data)

  if(!data){
    return null
  }

  return (
    <>
        <Paper className={classes.tweetsHeader} variant="outlined">
            <Typography variant="h6" style = {{fontSize: '1.25rem'}}>Marked</Typography>
            <Typography variant="body1" className="user__info-username">@{data ? data?.username : ''}</Typography>
        </Paper>
        {data.markedTweets && data?.markedTweets.map(tweet => {
          return(
              <Tweet
                marked = {true}
                liked = {!data.likedPosts ? false : Boolean(data.likedPosts.find(item => String(item) === tweet._id))} 
                key = {tweet._id}
                classes={classes} 
                isEditable = {String(data?._id) === tweet.user._id}
                {...tweet}/>
              )})
        }
    </>
  );
};
