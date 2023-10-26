require('dotenv').config()
const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { findUser } = require('../services/users')

const { JWT_SECRET } = process.env

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await findUser({ id: jwtPayload.id })
      if (!user) {
        const err: any = new Error('User not found')
        err.statusCode = 404
        throw err
      }

      //   done is an error-first callback with a signature (error, user, info). The found user is passed to the route handler.
      done(null, user)
    } catch (err) {
      done(err)
    }
  }
)

passport.use(strategy)

const initialize = () => {
  return passport.initialize()
}

const authenticate = () => {
  return passport.authenticate('jwt', { session: false })
}
