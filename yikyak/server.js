const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts")
const reply = require('./routes/api/reply')
const profile = require('./routes/api/profile')

const session = require('express-session')

// import App from './client/src/App'

const cors = require('cors');
const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware

app.use(session({ 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())

// Passport config
require("./config/passport")(passport)

// Routes
app.use("/api/users", users)
app.use("/api/profile", profile)
app.use("/api/posts", posts)
app.use("/api/reply", reply)

// app.get('/', function (req, res) { res.send('pong') });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('/*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

