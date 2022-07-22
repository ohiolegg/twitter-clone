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
import { useAppDispatch } from '../../hooks/redux'
import { removeTweet } from '../../redux/slices/tweetSlice'

interface TweetProps {
  text: string;
  _id: string;
  classes: ReturnType<typeof useHomeStyles>;
  createdAt: string;
  isEditable: boolean;
  images?: string[];
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
  classes,
  images
}: TweetProps): React.ReactElement => {

  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch()

  const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    navigate(`/home/tweet/${_id}`);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
    handleClose(event);
    if (window.confirm('Вы действительно хотите удалить твит?')) {
      dispatch(removeTweet(_id))
    }
  };

  return (
    <a onClick={handleClickTweet} className={classes.tweetWrapper} href={`/home/tweet/${_id}`}>
      <Paper className={classNames(classes.tweet, classes.tweetsHeader)} variant="outlined">
        
        <div className={classes.tweetHeader}>
            <div style ={{display: 'flex', alignItems: 'center'}}>
            <Avatar className={classes.tweetAvatar} alt={`Аватарка пользователя ${user.fullname}`} />
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
              <span>1</span>
            </div>
            <div>
              <IconButton>
                <RepostIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
            <div>
              <IconButton>
                <LikeIcon style={{ fontSize: 20 }} />
              </IconButton>
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
