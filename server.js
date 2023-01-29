const express = require("express")
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('express-flash')
const logger = require("morgan")
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require("cors")
const connectDB = require('./config/db')
const mainRoutes = require("./routes/main")
const gameRoutes = require("./routes/game")

// Use .env file in config folder
require("dotenv").config({path: "./config/.env"})

require("./config/passport")(passport);

// Connecting to the database
connectDB()

// middleware for views/public-clientside
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(expressLayouts)


// Logging requests and errors
app.use(logger("dev"))
app.use(cors())


app.use(session({
    secret: "MastermindAppSecretSession",
    saveUninitialized: false, 
    resave: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI})
    })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash messages package
app.use(flash());

// Body Parsing
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json())

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folders and layouts
app.set('layout', './layouts/main')

// Routes for the server to listen to
app.use("/", mainRoutes)
app.use("/game", gameRoutes)


// Connect to Port
app.listen(process.env.PORT, () => {
    console.log("Server is running better catch it!")
})

