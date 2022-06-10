// imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const port = 3001

//creating the express app
const app = express()

// connecting to mongoose database
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

// uses the routes file (base endpoint, contents of the route)
app.use('api', routes);

// used to bypass cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "url, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
    next();
});

// a middleware
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// basic get method for testing
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

// postgres stuff
const db = require('./queries')

app.get('/users', db.getUsers)

app.post('/checkemail', db.checkEmailUserAvailable)

app.post('/adduser', db.addUser)

app.post('/authentication', db.authenticate)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})