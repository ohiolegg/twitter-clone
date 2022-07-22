import { Avatar, CircularProgress, Paper, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { LoadingState, Tweet as TweetType, User } from '../../redux/slices/state'
import { fetchTweets } from '../../redux/slices/tweetSlice'
import { useHomeStyles } from '../Home/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import axios from 'axios'

import './User.scss'
import { useParams } from 'react-router-dom'
import { Tweet } from '../../components/Tweet'

export const UserPage: React.FC = () => {
  const classes = useHomeStyles();
  const { loadingState } = useAppSelector(state => state.tweets)
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = React.useState<number>(0)
  const [userData, setUserData] = React.useState<User | undefined>()
  const [tweets, setTweets] = React.useState<TweetType[] | undefined>()
  const { id } = useParams()
  const isloading = loadingState === LoadingState.LOADING

  React.useEffect(() => {
    if (id) {
        axios.get(`/users/${id}`).then(({data}) => {
            setUserData(data.user)
        })

        axios.get(`/tweets/user/${id}`).then(({data}) => {
          setTweets(data.tweets)
      })
    }
  }, [dispatch])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  }

  console.log(userData?.tweets)

  return (
    <Paper className={classNames(classes.tweetsWrapper, 'user')} variant="outlined">
      <Paper className={classes.tweetsHeader} variant="outlined">
        <ArrowBackIcon />

        <div>
          <Typography variant="h6">{userData?.fullname}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tweets ? tweets.length : 0} твита
          </Typography>
        </div>
      </Paper>

      <div className="user__header"></div>

      <div className="user__info">
        <Avatar />
        {!userData ? (
          <Skeleton variant="text" width={250} height={30} />
        ) : (
          <h2 className="user__info-fullname">{userData?.fullname}</h2>
        )}
        {!userData ? (
          <Skeleton variant="text" width={60} />
        ) : (
          <span className="user__info-username">@{userData?.username}</span>
        )}

        <p className="user__info-description">
          Frontend Developer / UI Designer / JavaScript Красное сердце ReactJS ⚛ React Native,
          NodeJS
        </p>
        <ul className="user__info-details">
          { userData?.location && <li>{userData?.location}</li>}
          {userData?.website && <>
            <li>
                <a className="link" href="https://archakov.im">
                {userData?.website}
                </a>
            </li>
            <li>
                <br />
            </li>
          </>}
          <li>Дата рождения: 28 октября 2005 г.</li>
          <li>Регистрация: ноябрь 2016 г.</li>
        </ul>
      </div>
      <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
        <Tab label="Твиты" />
        <Tab label="Твиты и ответы" />
        <Tab label="Медиа" />
        <Tab label="Нравится" />
      </Tabs>
      <div className="user__tweets">
        {isloading ? (
          <div className={classes.tweetsCentred}>
            <CircularProgress />
          </div>
        ) : (
            tweets && tweets.map((tweet) => (
                <Tweet key={tweet._id} classes={classes} isEditable = {userData ? userData._id === tweet._id : false} {...tweet} />
          ))
        )}
      </div>
    </Paper>
  );
};
