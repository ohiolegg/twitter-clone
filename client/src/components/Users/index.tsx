import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAddOutlined'
import React from 'react'
import { useHomeStyles } from '../../pages/Home/theme'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchUsers } from '../../redux/slices/randomUsers'

interface UsersProps{
    classes: ReturnType<typeof useHomeStyles>
}

const Users: React.FC<UsersProps> = ({classes}): React.ReactElement | null => {

  const {usersItems, loadingState} = useAppSelector( state => state.users)
  const dispatch = useAppDispatch()  

  React.useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if(loadingState === 'LOADING'){
    return null
  }

  return (         
    <Paper className={classes.rightSideBlock}>
    <Paper className={classes.rightSideBlockHeader} variant="outlined">
      <b>Кого читать</b>
    </Paper>
    <List>
        {
            usersItems && usersItems.map((user, i) => (
            <React.Fragment key = {user._id}>
                <ListItem className={classes.rightSideBlockItem}>
                    <ListItemAvatar>
                    <Avatar
                        alt={user.fullname}
                        src={user.avatarUrl}
                    />
                    </ListItemAvatar>
                    <ListItemText
                    primary={user.fullname}
                    secondary={
                        <Typography component="span" variant="body2" color="textSecondary">
                        @{user.username}
                        </Typography>
                    }
                    />
                    <Button color="primary">
                    <PersonAddIcon />
                    </Button>
                </ListItem>
                <Divider component="li" />
            </React.Fragment>
            ))
        }
    </List>
    </Paper>
  )
}

export default Users