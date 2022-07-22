import React from 'react';

import { SideMenu } from '../../components/SideMenu'
import { Container, Grid, InputAdornment, Paper } from '@mui/material'
import { useHomeStyles } from './theme'
import { SearchTextField } from '../../components/SearchTextField'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import { useAppDispatch } from '../../hooks/redux'
import { fetchTweets } from '../../redux/slices/tweetSlice'
import { fetchTags } from '../../redux/slices/tagsSlice'
import { Tags } from '../../components/Tags'
import { Outlet } from 'react-router-dom'
import Users from '../../components/Users'

export const Home = (): React.ReactElement => {
  const classes = useHomeStyles();

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchTweets())
    dispatch(fetchTags())
  }, [dispatch])

  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid sm={1} md={3} item>
          <SideMenu classes={classes} />
        </Grid>
        <Grid sm={8} md={6} item>
          <Paper className={classes.tweetsWrapper} variant="outlined">

            <Outlet/>
          </Paper>
        </Grid>
        <Grid sm={3} md={3} item>
          <div className={classes.rightSide}>
            <SearchTextField
              variant="outlined"
              placeholder="Поиск по Твиттеру"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            
            <Tags classes = {classes}/>

            <Users classes = {classes}/>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
      