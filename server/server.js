const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//connect to db
mongoose.connect('mongodb+srv://quizRoot:quizRoot@quiz-cluster-dqqzj.mongodb.net/Quiz-Project', {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establied successfully!");
})


//****Routing*****
//loading quizes
const quizRouter = require('./routes/quiz');
app.use('/', quizRouter);

//For registering
const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

//Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})