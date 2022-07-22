import { TextField, Theme } from "@mui/material";
import { withStyles } from "@mui/styles";

export const SearchTextField = withStyles((theme: Theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 30,
      backgroundColor: '#E6ECF0',
      padding: 0,
      paddingLeft: 15,
      '&.Mui-focused': {
        backgroundColor: '#fff',
        '& fieldset': { borderWidth: 1, borderColor: 'rgb(29, 161, 242)' },
        '& svg path': {
          fill: 'rgb(29, 161, 242)',
        },
      },
      '&:hover': {
        '& fieldset': { borderColor: 'transparent' },
      },
      '& fieldset': {
        borderColor: 'transparent',
        borderWidth: 1,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 14px 14px 5px',
    },
  },
}))(TextField);
