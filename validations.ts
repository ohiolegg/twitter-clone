import { body } from "express-validator"

export const loginValidation = [
    body('email', 'Invalid email data').isString().isEmail(),
    body('password', 'Min. length for password is 5 symbols').isString().isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Invalid email data').isString().isEmail().isLength({min: 10, max: 40}),
    body('password', 'Min. length for password is 5 symbols').isString().isLength({min: 5}).custom((value, {req}) => {
        if(value !== req.body.password2){
            throw new Error('Passwords are not the same')
        }else{
            return value
        }
      }),
    body('fullname', 'Type your name').isString().isLength({min: 3}),
    body('username', 'Type your name').isString().isLength({min: 3})
]

export const createTweetValidation = [
    body('text', 'Maximum text length is 280').isString().isLength({min: 1, max: 280}),
]

export const updateProfileValidation = [
    body('fullname', 'Type your name').isLength({min: 3})
]