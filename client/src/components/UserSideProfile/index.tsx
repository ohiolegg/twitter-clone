import React from 'react'
import { Avatar, colors, Menu, MenuItem, Typography } from '@mui/material'
import ArrowBottomIcon from '@mui/icons-material/ArrowDownwardOutlined'
import { Link } from 'react-router-dom'
import { useHomeStyles } from '../../pages/Home/theme'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { signOut } from '../../redux/slices/authSlice'

interface UserSideProfileProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const UserSideProfile: React.FC<UserSideProfileProps> = ({
  classes,
}: UserSideProfileProps) => {

  const userData = useAppSelector(state => state.auth.data)
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = (): void => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem('token');
    dispatch(signOut())
  }

  return ( userData && (
    <>
      <div onClick={handleOpenPopup} className={classes.sideProfile}>
        <Avatar src = {userData.avatarUrl}/>
        <div className={classes.sideProfileInfo}>
          <b>{userData.fullname}</b>
          <Typography style={{ color: colors.grey[500] }}>@{userData?.username}</Typography>
        </div>
        <ArrowBottomIcon />
      </div>
      <Menu
        classes={{
          paper: classes.profileMenu,
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClosePopup}
        keepMounted>
        <Link to = {`/user/${userData._id}`}>
          <MenuItem onClick={handleClosePopup}>My profile</MenuItem>
        </Link>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </>)
  );
};
