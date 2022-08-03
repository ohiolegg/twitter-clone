import { Button, Hidden, IconButton, Typography } from '@mui/material'
import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import SearchIcon from '@mui/icons-material/Search'
import UserIcon from '@mui/icons-material/PersonOutline'
import NotificationIcon from '@mui/icons-material/NotificationsNone'
import MessageIcon from '@mui/icons-material/MailOutline'
import BookmarkIcon from '@mui/icons-material/BookmarkBorder'
import ListIcon from '@mui/icons-material/FormatListBulleted'
import { useHomeStyles } from '../../pages/Home/theme'
import { ModalBlock } from '../Dialog'
import { AddTweetForm } from '../AddTweetForm'
import CreateIcon from '@mui/icons-material/BorderColorOutlined'
import { UserSideProfile } from '../UserSideProfile'
import { useAppSelector } from '../../hooks/redux'
import { Link } from 'react-router-dom'

interface SideMenuProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  classes,
}: SideMenuProps): React.ReactElement => {

  const [visibleAddTweet, setSetVisibleAddTweet] = React.useState<boolean>(false)
  const { data } = useAppSelector(state => state.auth)

  const handleClickOpenAddTweet = () => {
    setSetVisibleAddTweet(true)
  };

  const onCloseAddTweet = () => {
    setSetVisibleAddTweet(false)
  };


  return (
    <>
      <ul className={classes.sideMenuList}>
        <li className={classes.sideMenuListItem}>
          <Link to = '/'>
            <IconButton className={classes.logo} aria-label="" color="primary">
              <TwitterIcon className={classes.logoIcon} />
            </IconButton>
          </Link>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <SearchIcon className={classes.sideMenuListItemIcon} />
            <Hidden smDown>
              <Typography className={classes.sideMenuListItemLabel} variant="h6">
                Поиск
              </Typography>
            </Hidden>

          </div>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <NotificationIcon className={classes.sideMenuListItemIcon} />

            <Hidden smDown>
              <Typography className={classes.sideMenuListItemLabel} variant="h6">
                Уведомления
              </Typography>
            </Hidden>

          </div>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <MessageIcon className={classes.sideMenuListItemIcon} />

            <Hidden smDown>
              <Typography className={classes.sideMenuListItemLabel} variant="h6">
                Сообщения
              </Typography>
            </Hidden>

          </div>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <BookmarkIcon className={classes.sideMenuListItemIcon} />
            <Link to = {`/bookmarks/${data?._id}`}>
              <Hidden smDown>
                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                  Закладки
                </Typography>
            </Hidden>
            </Link>

          </div>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <ListIcon className={classes.sideMenuListItemIcon} />

            <Hidden smDown>
              <Typography className={classes.sideMenuListItemLabel} variant="h6">
                Список
              </Typography>
            </Hidden>

          </div>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <UserIcon className={classes.sideMenuListItemIcon} />
            
            <Link to = {`/user/${data?._id}`}>
              <Hidden smDown>
                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                  Профиль
                </Typography>
              </Hidden>
            </Link>

          </div>
        </li>
        <li className={classes.sideMenuListItem}>
          <Button
            onClick = {handleClickOpenAddTweet}
            className={classes.sideMenuTweetButton}
            variant="contained"
            color="primary"
            fullWidth>
            <Hidden smDown>Твитнуть</Hidden>
            <Hidden mdUp>
              <CreateIcon />
            </Hidden>
          </Button>
          <ModalBlock onClose={onCloseAddTweet} visible={visibleAddTweet}>
            <div style={{ width: 550 }}>
              <AddTweetForm maxRows={15} classes={classes} />
            </div>
          </ModalBlock>

        </li>
      </ul>
      <UserSideProfile classes = {classes}/>
    </>

  );
};
