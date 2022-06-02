const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const db = require('./queries')
const port = 3001

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "url, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
    next();
});

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)

app.post('/checkemail', db.checkEmailAvailable)

app.post('/adduser', db.addUser)

app.post('/authentication', db.authenticate)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})