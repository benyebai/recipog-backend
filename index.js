// imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const {Trending, Recipe} = require('./models/model')


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

// postgres requests
const db = require('./queries')

app.get('/users', db.getUsers)

app.post('/checkemail', db.checkEmailUserAvailable)

app.post('/adduser', db.addUser)

app.post('/authentication', db.authenticate)


//mongo requests, yes
app.post('/api/storetrending', (req, res) => {

  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  
  currentTrend = new Trending({date : year + "-" + month + "-" + date, data : req.body.data});
  currentTrend.save();
  
  console.log("success")

})

app.get('/api/gettrending/:date', (req, res) => {

  Trending.findOne({date : req.params.date}, function(errr, data){
    res.send(data)
  })
})

app.post('/api/storerecipe', (req, res) => {

  recipe = new Recipe({id : req.body.id, data : req.body.data});
  recipe.save();
  
  console.log("success1")

})

app.get('/api/getrecipe/:id', (req, res) => {

  Recipe.findOne({id : req.params.id}, function(errr, data){
    res.send(data)
  })
})


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})