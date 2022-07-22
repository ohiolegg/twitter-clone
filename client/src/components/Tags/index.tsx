import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'

import { useHomeStyles } from '../../pages/Home/theme'

interface TagProps {
  classes: ReturnType<typeof useHomeStyles>
}

export const Tags: React.FC<TagProps> = ({
  classes
}: TagProps): React.ReactElement | null=> {

  const {tagsItems, loadingState} = useAppSelector(state => state.tags)

  if(loadingState === 'LOADING'){
    return null
  }

  return (

  <Paper className={classes.rightSideBlock}>
    <Paper className={classes.rightSideBlockHeader} variant="outlined">
    <b>Актуальные темы</b>
    </Paper>
    <List>
      {
          tagsItems.map(tag => (
              <React.Fragment key = {tag._id}>
                  <Link to = {`/home/search?q=${tag.name}`}>
                      <ListItem className={classes.rightSideBlockItem}>
                      <ListItemText
                          primary={tag.name}
                          secondary={
                          <Typography component="span" variant="body2" color="textSecondary">
                              Твитов: {tag.count}
                          </Typography>
                          }
                      />
                      </ListItem>
                  </Link>
                  <Divider component="li" />
              </React.Fragment>
          ))
      }
    </List>
  </Paper>
  
  )
}
