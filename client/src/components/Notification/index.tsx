import { Alert, AlertColor, Snackbar } from '@mui/material';
import React from 'react'

interface NotificationProps {
  notificationObj: {
    text: string;
    type: AlertColor;
  } | undefined,
  open: boolean;
  setOpen: (payload: boolean) => void
}

export const Notification: React.FC<NotificationProps> = ({ notificationObj, open, setOpen }): React.ReactElement => {

  return (
    <>

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={notificationObj?.type}>
          {notificationObj?.text}
        </Alert>
      </Snackbar>
    </>
  )
}
