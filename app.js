require('./config/config')
const express = require('express')
const app = express()
const path= require('path');
const router= express.Router()
const bodyParser=require('body-parser');
const {urlShortener,retrieveUrl}=require('./server/short-url/url-shortener')
const {timestamp,timestamp_dateString} = require('./server/timestamp')
const {exercise_newUser, exercise_newExercise}= require('./server/exercise-tracker/exercise-tracker');
const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
// HTTPS Redirect
app.set('trust proxy', true);

// If dev, don't serve https
if (process.env.NODE_ENV=='production'){
  app.use(function(req, res, next) {
    if (req.secure){
      return next();
    }
    res.redirect("https://www." + req.headers.host + req.url);
  });
}

app.use(express.static('public'))

// APIs

// Timestamp
router.get('/timestamp', timestamp)
.get('/timestamp/:date_string', timestamp_dateString)
;

router.get('/whoami',(req,res,next)=>{
  let headers=req.headers;
  if (!headers['accept-language']){
    return res.json({"ipaddress":req.ip,"software":headers['user-agent']})
  }
  res.json({"ipaddress":req.ip,"software":headers['user-agent'],"language":headers['accept-language']})
})

// Url Shortener
router.get(/shorturl\/new\/.+/,urlShortener)
router.get('/shorturl/:link',retrieveUrl)

// Exercise Tracker
router.get('/exercise/new-user/:username',exercise_newUser)
router.post('/exercise/add',exercise_newExercise)
app.use('/api',router);

// Catch all other routes and return index
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

const PORT= process.env.port || 8080;
app.listen(PORT, () => console.log(`David Lau Portfolio listening on port ${PORT}!`))
