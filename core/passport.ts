import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as JWTstrategy, ExtractJwt} from 'passport-jwt'
import UserModel, { UserModelInterface } from '../models/UserModel'
import bcrypt from 'bcrypt'

passport.use(
    new LocalStrategy(async (username, password, done) : Promise<void> => {
        try{
            const user = await UserModel.findOne({$or : [{email: username}, {username}]}).exec()

            if(!user){
                return done(null, false)
            }

            const isValidPas = await bcrypt.compare(password, user.password)

            if(user.confirmed && isValidPas){
                return done(null, user)
            }else { 
                return done(null, false)
            }
        }catch(e){
            return done(e, false)
        }
    }
))

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY || '123',
            jwtFromRequest: ExtractJwt.fromHeader('token')
        },
        async (payload: {data: UserModelInterface}, done) => {
            try{
                const user = await UserModel.findById(payload.data._id).exec()

                if(user){
                    return done(null, user)
                }

                done(null, false)
            }catch(e){
                done(e)
            }
        }
    )
)

passport.serializeUser((user: any, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err: any, user: any) => {
        done(err, user)
    })
})

export { passport }