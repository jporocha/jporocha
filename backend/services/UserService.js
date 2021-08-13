const UserModel = require ("../models/UserModel")
const pepper = process.env.PEPPER
const User = new UserModel

if (!pepper) {
  console.log('Sem PEPPER nas variaveis de ambiente')
  process.exit(1)
}

module.exports = class UserService {
  constructor() {}

  static async CreateUser(user) {
    let response = await User.createUser(user)
    if (response.user) {
      return {
      payload: response.user,
      statusCode: 201
      }
    } else {
      return {
        payload: response.error,
        statusCode: 404
      }
    }
  }

  static async SignIn(user) {
    let response = await User.validateLogin(user)
    if (response.token) {
      return {
      payload: response.token,
      statusCode: 201
      }
    } else {
      return {
        payload: response.error,
        statusCode: 404
      }
    }
  }
}