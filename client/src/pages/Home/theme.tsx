import { colors, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useHomeStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        height: '100vh',
    },
    logo: {
        margin: '10px 0',
    },
    logoIcon: {
        width: '36px !important',
        height: '36px !important'
    },
    tweetsCentered: {
      textAlign: 'center',
      marginTop: 40
    },
    sideMenuList: {
        listStyle: 'none',
        padding: 0,
        paddingTop: 15,
        margin: 0,
        width: 230,
        position: 'sticky',
        top: 0
    },
    fullTweetFooter: {
      margin: '0 auto',
      borderTop: '1px solid #E6ECF0',
      left: 0,
      maxWidth: '100%',
      justifyContent: 'space-around',
      padding: '2px 0',
      marginTop: 20,
    },  
    sideMenuListItem: {
        cursor: 'pointer',
        '&:hover': {
        '& div': {
            backgroundColor: 'rgba(29, 161, 242, 0.1)',
            '& h6': {
            color: 'rgb(29, 161, 242)',
            },
            '& svg path': {
            fill: 'rgb(29, 161, 242)',
            },
        },
        },

        '& div': {
        display: 'inline-flex',
        alignItems: 'center',
        position: 'relative',
        padding: '0 25px 0 20px',
        borderRadius: 30,
        height: 50,
        marginBottom: 15,
        transition: 'background-color 0.1s ease-in-out',
        },
    },
    sideMenuListItemLabel: {
        fontWeight: 700,
        fontSize: 20,
        marginLeft: 15,
    },
    sideMenuListItemIcon: {
        fontSize: 32,
        marginLeft: -5,
    },
    sideMenuTweetButton: {
        padding: 6.4,
        marginTop: 4,
    },
    tweetsWrapper: {
        borderRadius: 0,
        height: '100%',
        borderTop: '0',
        borderBottom: '0',
    },
    tweetWrapper : {
      color: 'inherit',
      textDecoration: 'none'
    },
    tweetHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tweetContent: {
      flex: 1,
    },  
    fullTweet: {
      padding: 22,
      paddingBottom: 0
    },
    grayText: {
      color: "gray",
      '&:hover': {
        color: 'rgb(249, 24, 128)',
      },
    },
    fullTweetText: {
      fontSize: 24,
      marginTop: 20,
      lineHeight: 1.3125,
      wordBreak: 'break-word',
    },
    tweetsHeaderUser: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
    },
    tweetsHeader: {
        borderTop: '0',
        /* position: 'sticky', 
        top: 0, */
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        padding: '10px 15px',
        '& h6': {
        fontWeight: 800,
        },
    },
    tweet: {
        cursor: 'pointer',
        paddingTop: 15,
        paddingLeft: 20,
        '&:hover': {
        backgroundColor: 'rgb(245, 248, 250)',
        },
    },
    tweetAvatar: {
        width: 20,
        height: 20,
        marginRight: 20
    },
    tweetFooter: {
        display: 'flex',
        position: 'relative',
        left: -13,
        justifyContent: 'space-between',
    },
    tweetUserName: {
        color: grey[500],
    },
    rightSide: {
        paddingTop: 20,
        position: 'sticky',
        top: 0,
        '& a': {
          color: 'inherit !important',
          textDecoration: 'none !important'
        }
      },
      rightSideBlock: {
        backgroundColor: '#F5F8FA',
        borderRadius: 15,
        marginTop: 20,
        '& .MuiList-root': {
          paddingTop: 0,
        },
    },
    rightSideBlockHeader: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        backgroundColor: 'transparent',
        padding: '13px 18px',
        '& b': {
          fontSize: 20,
          fontWeight: 800,
        },
      },
      rightSideBlockItem: {
        cursor: 'pointer',
        '& .MuiTypography-body1': {
          fontWeight: 700,
        },
        '& .MuiListItemAvatar-root': {
          minWidth: 50,
        },
        '& .MuiListItemText-root': {
          margin: 0,
        },
        '&:hover': {
          backgroundColor: '#edf3f6',
        },
      },
      addForm: {
        padding: 20,
      },
      addFormBody: {
        display: 'flex',
        width: '100%',
      },
      addFormBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      addFormBottomActions: {
        marginTop: 10,
        paddingLeft: 70,
      },
      addFormTextarea: {
        width: '100%',
        border: 0,
        fontSize: 20,
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'none',
      },
      addFormBottomLine: {
        height: 12,
        backgroundColor: '#E6ECF0',
      },
      addFormCircleProgress: {
        position: 'relative',
        width: 20,
        height: 20,
        margin: '0 10px',
        '& .MuiCircularProgress-root': {
          position: 'absolute',
        },
      },
      addFormBottomRight: {
        display: 'flex',
        alignItems: 'center',
      },
      tweetBack: {
        padding: '20px 20px',
      },
      profileMenu: {
        top: 'auto !important',
        left: '17.5% !important',
        width: '250px !important',
        bottom: '110px !important',
        'box-shadow': '1px 1px 10px rgba(0, 0, 0, 0.08)',
        'border-radius': '20px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        '& a': {
          color: 'black',
          textDecoration: 'none',
        },
      },
      tweetsCentred: {
        marginTop: 50,
        textAlign: 'center',
      },    
      sideProfile: {
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        bottom: 30,
        padding: '10px 15px',
        width: 260,
        borderRadius: 50,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: colors.lightBlue[50],
        },
      },
      sideProfileInfo: {
        flex: 1,
        marginLeft: 10,
        '& b': {
          fontSize: 16,
        },
      },
      imagesList: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        flexWrap: 'wrap',
      },
      imagesListItem: {
        width: '85%',
        height: '85%',
        borderRadius: '5%',
        marginRight: 10,
        marginBottom: 10,
        position: 'relative',
        overflow: 'hidden',
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
        '& svg path': {
          fill: 'white',
        },
      },    

}));    