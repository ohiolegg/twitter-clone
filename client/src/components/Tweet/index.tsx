import React from 'react'
import classNames from 'classnames'

import CommentIcon from '@mui/icons-material/ChatBubbleOutline'
import RepostIcon from '@mui/icons-material/Reply'
import ShareIcon from '@mui/icons-material/IosShare'
import LikeIcon from '@mui/icons-material/FavoriteBorder'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { useHomeStyles } from '../../pages/Home/theme';
import { Avatar, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import ImageList from '../ImageList'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addLike, removeTweet } from '../../redux/slices/tweetSlice'
import { fetchAddLike } from '../../redux/slices/tweetSlice'

interface TweetProps {
  text: string;
  _id: string;
  classes: ReturnType<typeof useHomeStyles>;
  createdAt: string;
  isEditable: boolean;
  images?: string[];
  likes: number;
  user: {
    _id?: string;
    fullname: string;
    username: string;
    avatarUrl: string;
  };
}

export const Tweet: React.FC<TweetProps> = ({
  text,
  createdAt,
  user,
  _id,
  isEditable,
  likes,
  classes,
  images
}: TweetProps): React.ReactElement => {

  let navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [liked, setLiked] = React.useState<boolean>(false)
  const open = Boolean(anchorEl)
  const dispatch = useAppDispatch()
  const likedPosts = useAppSelector(state => state.auth.data ? state.auth.data.likedPosts : false)

  React.useEffect(() => {
    if(!likedPosts){
      return
    }

    if(likedPosts.find(item => String(item) === _id)){
      setLiked(true)
    } 
  }, [])

  const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    navigate(`/home/tweet/${_id}`)
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setAnchorEl(null)
  };

  const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
    handleClose(event);
    if (window.confirm('Вы действительно хотите удалить твит?')) {
      dispatch(removeTweet(_id))
    }
  };

  const likeHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    event.preventDefault()
    if(liked){
      dispatch(addLike({_id, n: -1}))
      dispatch(fetchAddLike(_id))
    }

    if(!liked){
      dispatch(addLike({_id, n: 1}))
      dispatch(fetchAddLike(_id))
    }
    setLiked(!liked)
  }

  return (
    <a className={classes.tweetWrapper}>
      <Paper className={classNames(classes.tweet, classes.tweetsHeader)} variant="outlined">
        
        <div className={classes.tweetHeader}>
            <div style ={{display: 'flex', alignItems: 'center'}}>
            <Avatar className={classes.tweetAvatar} src = {user?.avatarUrl} alt={`Аватарка пользователя ${user.fullname}`} />
              <b>{user.fullname}</b>&nbsp;
              <span className={classes.tweetUserName}>@{user.username}</span>&nbsp;
              <span className={classes.tweetUserName}>·</span>&nbsp;
              <span className={classes.tweetUserName}>{formatDate(new Date(createdAt))}</span>
            </div>
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {isEditable ? (
                  <>
                    <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                    <MenuItem onClick={handleRemove}>Удалить твит</MenuItem>
                  </>

                ): (
                  <>
                    <MenuItem onClick={handleClose}>Начать читать @{user.username}</MenuItem>
                    <MenuItem onClick={() => alert('Fuck you')}>Пожаловаться на твит</MenuItem>
                  </>
                )}
                
              </Menu>
            </div>
        </div>
        <div className={classes.tweetContent}>
          <Typography variant="body1" gutterBottom>
            {text}
            {images && <ImageList classes={ classes } images={ images } />}
          </Typography>
          <div className={classes.tweetFooter}>
            <div>
              <IconButton>
                <CommentIcon style={{ fontSize: 20 }} />
              </IconButton>
              <span className={classes.grayText}>1</span>
            </div>
            <div>
              <IconButton>
                <RepostIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
            <div>
              <IconButton sx={{ "&:hover": {color: 'rgb(249, 24, 128)', backgroundColor: 'rgb(249, 24, 128, 0.20)' } }} onClick = {likeHandler}>
                <LikeIcon style={{ fontSize: 20, color: liked ? 'rgb(249, 24, 128)' : '', fill: liked ? 'rgb(249, 24, 128)' : ''}}/> 
              </IconButton>
              <span style={{color: liked ? 'rgb(249, 24, 128)' : 'gray'}}>{likes}</span>
            </div>
            <div>
              <IconButton>
                <ShareIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
    </a>
  )
};
