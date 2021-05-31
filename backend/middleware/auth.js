const User = require('../models/user')

module.exports = function(roles = {isAdmin: false}) {
  const isAdminRequired = roles.isAdmin

  return (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth) return res.status(400).send('Autorização não enviada')

    const [, token] = auth.split(' ')
    if (!token) return res.status(400).send('Token não enviado')

    const tokenData = User.verifyToken(token)
    if (!tokenData) return res.status(401).send('Token Expirado ou inválido')


    if (isAdminRequired && !tokenData.isAdmin) return res.status(403).send('Você não tem permissão para acessar essa rota')   

    next()
  }
}