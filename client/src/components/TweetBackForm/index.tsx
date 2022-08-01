import React from 'react'
import classNames from 'classnames'
import { useHomeStyles } from '../../pages/Home/theme' 
import { Alert, Avatar, Button, CircularProgress, TextareaAutosize } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addComment, addTweet, setAddFormState } from '../../redux/slices/tweetSlice'
import { AddFormState } from '../../redux/slices/state'
import UploadImages from '../UploadImages'
import { uploadImage } from '../../utils/uploadImage'

interface TweetBackFormProps {
  classes: ReturnType<typeof useHomeStyles>;
  maxRows?: number;
  originalUser: string;
  tweetId: string;
}

export interface imageObj {
  file: File;
  blobUrl: string
}

const MAX_LENGTH = 280;

export const TweetBackForm: React.FC<TweetBackFormProps> = ({
  classes,
  maxRows,
  tweetId,
  originalUser
}): React.ReactElement => {

  const [text, setText] = React.useState<string>('')
  const textLimitPercent = Math.round((text.length / MAX_LENGTH ) * 100)
  const textCount = MAX_LENGTH - text.length 
  const [images, setImages] = React.useState<imageObj[]>([])

  const addFormState = useAppSelector(({tweets}) => tweets.addFormState)
  const userData = useAppSelector(state => state.auth.data)

  const dispatch = useAppDispatch()

  const handleChangeTextare = (e: React.FormEvent<HTMLTextAreaElement>) : void => {
    if(e.currentTarget)(
      setText(e.currentTarget.value)
    )
  }

  const handleClickAddComment = async () : Promise<void> => {
    let result : string[] = []
    dispatch(setAddFormState(AddFormState.LOADING))
    for (let i = 0; i < images.length; i++){
      const file = images[i].file
      const { url } = await uploadImage(file)
      result.push(url)
    }

    dispatch(addComment({text, images: result, tweet: tweetId}))

    setText('')
    setImages([])
  }

  return (
    <div>
      
        <p style = {{fontSize: 14, color: 'rgb(83, 100, 113)'}}>Tweet back <span style={{color: 'rgb(29, 161, 242)'}}>@{originalUser}</span></p>
      
      <div className={classes.addFormBody}>
        <Avatar
          className={classes.tweetAvatar}
          alt={`Аватарка пользователя UserAvatar`}
          src = { userData ? userData.avatarUrl : undefined}
        />
        <TextareaAutosize
          onChange={handleChangeTextare}
          className={classes.addFormTextarea}
          placeholder={"Tweet back"}
          value={text}
          maxRows ={maxRows}
        />
      </div>
      <div className={classes.addFormBottom}>
        <div className={classNames(classes.tweetFooter, classes.addFormBottomActions)}>
          <UploadImages images = {images} onChangeImages = {setImages}/>
          {/* <IconButton color="primary">
            <MoodIcon style={{ width: 26 }} />
          </IconButton> */}
        </div>
        <div className={classes.addFormBottomRight}>
          {text && (
            <>
              <span>{textCount}</span>
              <div className={classes.addFormCircleProgress}>
                <CircularProgress
                  variant="determinate"
                  size={20}
                  thickness={5}
                  value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                  style={text.length >= MAX_LENGTH ? { color: 'red' } : undefined}
                />
                <CircularProgress
                  style={{ color: 'rgba(0, 0, 0, 0.1)' }}
                  variant="determinate"
                  size={20}
                  thickness={5}
                  value={100}
                />
              </div>
            </>
          )}
          <Button
            onClick={handleClickAddComment}
            disabled={!text || text.length >= MAX_LENGTH}
            color="primary"
            variant="contained">
            {
              addFormState === AddFormState.LOADING ? <CircularProgress color = 'inherit' size = {16}/> : 'Твитнуть' 
            }
          </Button>
        </div>
      </div>
      {
        addFormState === AddFormState.ERROR && (
          <Alert severity='error'>
            Something went wrong on adding the tweet 😟
          </Alert>
        )
      }
    </div>
  );
};
