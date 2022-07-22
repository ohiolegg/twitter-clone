import React from 'react'

import CommentIcon from '@mui/icons-material/ChatBubbleOutline'
import RepostIcon from '@mui/icons-material/Reply';
import ShareIcon from '@mui/icons-material/IosShare'
import LikeIcon from '@mui/icons-material/FavoriteBorder'

import { useHomeStyles } from '../../pages/Home/theme'
import { Avatar, CircularProgress, Divider, IconButton, Paper, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import format from 'date-fns/format'
import engLang from 'date-fns/locale/en-US'

import { Tweet } from '../Tweet'
import classNames from 'classnames'
import ImageList from '../ImageList'

import mediumZoom from 'medium-zoom'

interface fullTweetProps {
  classes: ReturnType<typeof useHomeStyles>;
}

interface fullTweet {
    text: string;
    _id: string;
    createdAt?: string;
    images?: string[];
    user: {
      _id?: string;
      fullname: string;
      username: string;
      avatarUrl: string;
    };
  }

export const FullTweet: React.FC<fullTweetProps> = ({
  classes
}: fullTweetProps): React.ReactElement | null=> {

  const [tweet, setTweet] = React.useState<fullTweet>() 
  const [isLoaded, setLoaded] = React.useState<boolean>(false)

  const params : { id?: string } = useParams()
  const id = params.id

  React.useEffect(() => {
    setLoaded(false)
    axios.get(`/tweets/${id}`).then(({data}) => {
        setTweet(data.tweet)
        setLoaded(true)
    })
  }, [id])

  React.useEffect(() => {
    if(isLoaded){
      mediumZoom('.tweet-images div img')
    }
  }, [isLoaded])

  if(!isLoaded){
    return <div className={classes.tweetsCentered}><CircularProgress /> </div>
  }

  if(!tweet){
    return null
  }

  const createdAt = tweet.createdAt ? tweet.createdAt : ''
  
  return (
    <>
      <Paper className={classes.fullTweet}>
        <div className={classes.tweetsHeaderUser}>
          <Avatar
            className={classes.tweetAvatar}
            alt={`Аватарка пользователя ${tweet.user.fullname}`}
          />
          <Typography>
            <Link to={`/user/${tweet.user._id}`}>
              <b>{tweet.user.fullname}</b>
              <div>
              <span className={classes.tweetUserName}>@{tweet.user.username}</span>&nbsp;
            </div>
            </Link>
          </Typography>
        </div>
        <Typography className={classes.fullTweetText} gutterBottom>
          {tweet.text}
          <div className="tweet-images">
            {tweet.images && <ImageList classes={classes} images={tweet.images} />}
          </div>
        </Typography>
        <Typography>
          <span className={classes.tweetUserName}>
            {format(new Date(createdAt), 'H:mm', { locale: engLang })} ·{' '}
          </span>
          <span className={classes.tweetUserName}>
            {format(new Date(createdAt), 'dd MMM. yyyy .', { locale: engLang })}
          </span>
        </Typography>
        <div className={classNames(classes.tweetFooter, classes.fullTweetFooter)}>
          <IconButton>
            <CommentIcon style={{ fontSize: 25 }} />
          </IconButton>
          <IconButton>
            <RepostIcon style={{ fontSize: 25 }} />
          </IconButton>
          <IconButton>
            <LikeIcon style={{ fontSize: 25 }} />
          </IconButton>
          <IconButton>
            <ShareIcon style={{ fontSize: 25 }} />
          </IconButton>
        </div>
      </Paper>
      <Divider />
      <Tweet
        isEditable = {false}
        _id="1"
        text="Any more to move? You might need to adjust your stretching routines!"
        createdAt={new Date().toString()}
        user={{
          fullname: 'Arlene Andrews',
          username: 'ArleneAndrews_1',
          avatarUrl: '/d'
        }}
        classes={classes}
      />
      <Tweet
        isEditable = {false}
        _id="1"
        text="Any more to move? You might need to adjust your stretching routines!"
        createdAt={new Date().toString()}
        user={{
          fullname: 'Arlene Andrews',
          username: 'ArleneAndrews_1',
          avatarUrl: '/d'
        }}
        classes={classes}
      />
      <Tweet
        isEditable = {false}
        _id="1"
        text="Any more to move? You might need to adjust your stretching routines!"
        createdAt={new Date().toString()}
        user={{
          fullname: 'Arlene Andrews',
          username: 'ArleneAndrews_1',
          avatarUrl: '/d'
        }}
        classes={classes}
      />
    </>
  );

}
