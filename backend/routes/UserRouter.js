// /api/users/

const UserService = require("../services/UserService")
const express = require('express')
const router = express.Router()

router.post('/createUser', async (req, res) => {

  const { name, email, password } = req.body

  if (!name || !email || !password) return res.status(400).send({ erro: 'Dados incompletos' })

  const newUser = {
    name,
    email,
    password
  }

  let response = await UserService.CreateUser(newUser)
  res.status(response.statusCode).send(response.payload)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).send({ erro: 'Dados incompletos' }) 
  
  const userData = {email, password}

  let response = await UserService.SignIn(userData)
  res.status(response.statusCode).send(response.payload)
})

module.exports = router