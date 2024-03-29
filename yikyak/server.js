require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts")
const comments = require('./routes/api/comments')
const profile = require('./routes/api/profile')

const session = require('express-session')

const cors = require('cors');
const keys = require("./config/keys");
const app = express();
const port = process.env.PORT || 5000;

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
const db = process.env.ATLAS_URI || keys.ATLAS_URI;
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
  secret: process.env.secretOrKey || keys.secretOrKey,
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
app.use("/api/comments", comments)

// app.get('/', function (req, res) { res.send('pong') });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
} else {
  const path = require('path');
  app.use(express.static(path.resolve(__dirname, 'client', 'public', 'index.html')));
}

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

