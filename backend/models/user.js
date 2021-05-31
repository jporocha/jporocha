const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

if (!secret) {
  console.log('Sem JWT_SECRET nas variaveis de ambiente')
  process.exit(1)
}

let userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, lowercase: true, unique: true },
  role: {type: Array, default: ['cliente']},
  passwordHash: {type: String, required: true},
  activeTokens: {type: Array, default: []}
})

userSchema.methods.compareHash = async function(pass) { return await bcrypt.compare(pass, this.passwordHash) }

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ user: this.email, role: this.role }, secret, { expiresIn: '7d'})
  return token
}

userSchema.statics.generateHash = async function(pass) { return await bcrypt.hash(pass, 8) }

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