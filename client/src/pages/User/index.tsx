import { Avatar, Button, CircularProgress, Hidden, Paper, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { LoadingState, Tweet as TweetType, User } from '../../redux/slices/state'
import { useHomeStyles } from '../Home/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import axios from 'axios'

import './User.scss'
import { useParams } from 'react-router-dom'
import { Tweet } from '../../components/Tweet'
import { ModalBlock } from '../../components/Dialog'
import { ChangeProfileForm } from '../../components/changeProfileForm'

export const UserPage: React.FC = () => {
  const classes = useHomeStyles();
  const { loadingState } = useAppSelector(state => state.tweets)
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = React.useState<number>(0)
  const [userData, setUserData] = React.useState<User | undefined>()
  const [tweets, setTweets] = React.useState<TweetType[] | undefined>()
  const { id } = useParams()
  const isloading = loadingState === LoadingState.LOADING
  const [visibleChangeProfile, setVisibleChangeProfile] = React.useState<boolean>(false)

  const handleClickOpenChangeProfile = () => {
    setVisibleChangeProfile(true)
  };

  const onCloseChangeProfile = () => {
    setVisibleChangeProfile(false)
  };

  React.useEffect(() => {
    if (id) {
        axios.get(`/users/${id}`).then(({data}) => {
            setUserData(data.user)
        })

        axios.get(`/tweets/user/${id}`).then(({data}) => {
          setTweets(data.tweets)
      })
    }
  }, [dispatch, id])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  }

  return (
    <Paper className={classNames(classes.tweetsWrapper, 'user')} variant="outlined">
      <Paper className = "user__header-page" variant="outlined">
        <ArrowBackIcon style = {{marginRight: 15}}/>

        <div>
          <Typography variant="h6">{userData?.fullname}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tweets ? tweets.length : 0} твита
          </Typography>
        </div>
      </Paper>

      <div className="user__header"></div>

      <div className="user__info">
        <Avatar src = {userData?.avatarUrl}/>
        <div className='user__info-wrapper'>
          <div>
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
          </div>

          <Button
              onClick = {handleClickOpenChangeProfile}
              className= "change-button">
              Изменить профиль
          </Button>
        </div>
      
        <p className="user__info-description">
          {userData?.about}
        </p>
        <ul className="user__info-details">
          { userData?.location && <li>{userData?.location}</li>}
          {userData?.website && <>
            <li>
                <a className="link" href={userData?.website}>
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

      <ModalBlock title = {'Change your profile'} onClose={onCloseChangeProfile} visible={visibleChangeProfile}>
              <ChangeProfileForm userData = {userData}/>
      </ModalBlock>
    </Paper>
  );
};
