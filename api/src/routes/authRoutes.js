const router = require('express').Router()
const auth = require('../services/authService')
const passport = require('passport')

router.get('/', (req, res) => {
  res.json({ message: 'POST /register or /login ' })
})

router.post('/register', (req, res) => {
  auth.register(req, res)
})

router.post('/login', (req, res) => {
  auth.login(req, res)
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  async (req, res) => {
    const { user, token } = req.user;
    res.redirect(`http://localhost:5173/oauth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`)
  }
)

module.exports = router