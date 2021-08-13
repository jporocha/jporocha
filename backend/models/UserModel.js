const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const pepper = process.env.PEPPER

if (!secret || !pepper) {
  console.log('Sem JWT_SECRET e/ou PEPPER nas variaveis de ambiente')
  process.exit(1)
}

const generateToken = function(user) {
  const token = jwt.sign({ id: user._id, user: user.email, role: user.role }, secret, { expiresIn: '7d'})
  return token
}

let userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, lowercase: true, unique: true },
  role: {type: Array, default: ['cliente']},
  passwordHash: {type: String, required: true},
})

userSchema.methods.createUser = async function(user) {
  try {
    let userExists = await mongoose.model('User').findOne({email: user.email})
    if (userExists) throw new Error ('Usuário já existe no sistema.')
    user.passwordHash = await bcrypt.hash(user.password + pepper, 8)
    delete user.password
    let newUser = new mongoose.model('User')(user)
    await newUser.save()
    return {user : newUser}
  } catch(e) {
    return {error: e}
  }
}

userSchema.methods.validateLogin = async function(user) {
  try {
    const userExists = await mongoose.model('User').findOne({email : user.email})
    if (!userExists) throw new Error ('Usuário ou senha inválidos.')
    const validateUser = await bcrypt.compare(`${user.password}${pepper}`, userExists.passwordHash)
    if (!validateUser) throw new Error ('Usuário ou senha inválidos.')
    const token = generateToken(userExists)
    return {token}
  } catch (e) {
    return {error: e}
  }
}

userSchema.statics.verifyToken = function(token) {
  let data = null
  try {
    data = jwt.verify(token, secret)
  } catch (error) {
    return null
  }  
  return data
}

const model = mongoose.model('User', userSchema, 'Users')

module.exports = model