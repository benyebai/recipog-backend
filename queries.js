const { response } = require('express')
require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})

// returns all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM account_info ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows)
  })
}

// is that email or username still available
const checkEmailUserAvailable = (request, response) =>  {
  const email = request.body.email
  const username = request.body.username

  pool.query('SELECT * FROM account_info WHERE email = $1 OR username = $2', [email, username], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).send(results)
  })

}

// adds a user into the database based on the given info by the frontend
const addUser = (request, response) =>  {
  const email = request.body.email
  const password = request.body.password
  const username = request.body.username

  pool.query('INSERT INTO account_info (email, password, username) VALUES ($1, $2, $3)', [email, password, username], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).send("user added")
  })

}

// checks if your email and password match in the database
const authenticate = (request, response) =>  {
  const email = request.body.email
  const password = request.body.password

  pool.query('SELECT * FROM account_info WHERE email = $1 AND password = $2', [email, password], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).send(results)
  })

}

module.exports = {
  getUsers,
  checkEmailUserAvailable,
  addUser,
  authenticate
  
}