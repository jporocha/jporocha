const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy

passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK
},
function(accessToken, refreshToken, profile, done) {
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)
}))

module.exports = passport