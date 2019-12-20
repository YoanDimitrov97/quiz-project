const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require("cors");
const MongoStore = require('connect-mongo')(session);
const sessionCheck = require('../middleware/sessionCheck');

const app = express();
const port = process.env.PORT || 5000;
const TWO_HOURS = 1000 * 60 * 60 * 2;

//connect to db
mongoose.connect('mongodb+srv://quizRoot:quizRoot@quiz-cluster-dqqzj.mongodb.net/Quiz-Project', {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establied successfully!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Sessions
app.use(session({
    secret: '1a2b3c4d5e6i7y8p9w0',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: connection }),
    cookie: {
        maxAge: TWO_HOURS,
    }
}));

//****Routing*****
//loading quizes
const quizRouter = require('./routes/quiz');
app.use('/', quizRouter);

//For registering
const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

// Login and Logout
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);
const logoutRouter = require('./routes/logout');
app.use('/logout', logoutRouter);

//Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})