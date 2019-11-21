const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

//connect to db
mongoose.connect('mongodb://localhost:27017/quiz', {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true});
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