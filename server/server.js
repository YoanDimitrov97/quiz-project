const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require("cors");

const MongoStore = require('connect-mongo')(session);

const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const TWO_HOURS = 1000 * 60 * 60 * 2;

//connect to db
mongoose.connect('mongodb+srv://quizRoot:quizRoot@quiz-cluster-dqqzj.mongodb.net/Quiz-Project?retryWrites=true&w=majority', {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify:false});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establied successfully!");
});

app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    socket.emit('news', "just testing stuff...");
    //socket.on('test',(msg) => console.log(msg)); // emit an event to all connected sockets

});

// Sessions
app.use(session({
    secret: '1a2b3c4d5e6i7y8p9w0',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: connection }),
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
    }
}));

//****Routing*****
//loading quizes
const quizRouter = require('./routes/quiz');
app.use('/', quizRouter);

const userRouter = require('./routes/users');
app.use('/', userRouter);

const roomRouter = require('./routes/room');
app.use('/', roomRouter);

//For registering
const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

// Login and Logout
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);
const logoutRouter = require('./routes/logout');
app.use('/logout', logoutRouter);

//Start the server
http.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})