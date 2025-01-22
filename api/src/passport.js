const passport = require('passport')
const githubStrategy = require('passport-github2').Strategy
const auth = require('./services/authService')
// const User = require('./modell/userSchema')

passport.use(
  'github', // strategy name here
  new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:5001/api/auth/github/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    await auth.githubLogin(profile, done)
  })
);

passport.use(
  'githubb', // different strategy name for the second one
  new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID1,
    clientSecret: process.env.GITHUB_CLIENT_SECRET1,
    callbackURL: 'http://localhost:5001/api/auth/githubb/callbackk',
  }, async (accessToken, refreshToken, profile, done) => {
    await auth.githubLogin(profile, done)
  })
);
