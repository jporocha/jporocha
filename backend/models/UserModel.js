const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pepper = process.env.PEPPER

if (!pepper) {
  console.log('Sem PEPPER nas variaveis de ambiente')
  process.exit(1)
}

let userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: false, lowercase: true, unique: true },
  role: {type: Array, default: ['cliente']},
  passwordHash: {type: String, required: false},
  facebookId: {type: Number, required: false}
})

// Para registro de estratégia local
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

// Para login via social media
userSchema.methods.FindOrCreateUser = async function(user) {
  try {
    let userExists = await mongoose.model('User').findOne({email: user.email})
    if (userExists) return {user: userExists}
    let newUser = new mongoose.model('User')(user)
    await newUser.save()
    return {user : newUser}
  } catch(e) {
    return {error: e}
  }
}

// Para login via estratégia local
userSchema.methods.validateLogin = async function(user) {
  try {
    const userExists = await mongoose.model('User').findOne({email : user.email})
    if (!userExists) throw new Error ('Usuário ou senha inválidos.')
    const validateUser = await bcrypt.compare(`${user.password}${pepper}`, userExists.passwordHash)
    if (!validateUser) throw new Error ('Usuário ou senha inválidos.')
    return {user: userExists}
  } catch (e) {
    return {error: e}
  }
}

const model = mongoose.model('User', userSchema, 'Users')

module.exports = model