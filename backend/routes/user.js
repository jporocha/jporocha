// /api/users/

const express = require('express')
const router = express.Router()
const User = import("../controllers/User.js")

router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) return res.status(400).send({ erro: 'Dados incompletos' })
  
  // const passwordHash = await User.generateHash(password)

  try {
    user = await User.create({ name, email, passwordHash, role })
  } catch (error) {    
    if (error.code === 11000) return res.status(400).send({ erro:`Usuário ${email} já cadastrado no sistema`})
    else res.status(500).send({erro: 'Erro desconhecido tentando salvar usuário no BD'})    
  }  
  if (user) res.status(201).json({token: user.generateToken()})
})
/* 
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).send({ erro: 'Dados incompletos' }) 
  
  try {
    let user = await User.find({email: email})
    if (!user) throw new Error('Usuário não encontrado')
    let authenticated = User.compareHash(password)
    if (!authenticated) throw new Error('Dados de login inválidos')
    res.status(200).json({token: user.generateToken()})
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.get('/', async (req, res) => {
  res.status(200).send('Ok')
})

router.put('/:email', async (req, res) => {
  const { oldName, name, email } = req.body  
  if (!oldName || !name || !email ) return res.status(400).send('Dados incompletos') 
  const oldEmail = req.params.email
  
  try {
    const updated = await User.updateOne({ email: oldEmail }, { name, email})    
    if (updated.n === 0) return res.status(400).send('Usuário não encontrado')
    else {
      if (updated.nModified === 0) return res.status(400).send('Usuário encontrado, porém não modificado')
      if (updated.nModified === 1) return res.status(200).send('Usuário mdificado com sucesso!')
    }
  } catch (error) {    
    res.status(500).send('Erro desconhecido tentando atualizar dados do usuário no BD')
  }

  return res.status(400).json('Algum erro ocorreu')
})

router.delete('/:email', async (req, res) => {
  const email = req.params.email
  
  try {
    const deleted = await User.deleteOne({ email })    
    if (deleted.n === 0) return res.status(400).send('Usuário não encontrado')
    else {
      if (deleted.deletedCount === 0) return res.status(400).send('Usuário encontrado, porém não deletado')
      if (deleted.deletedCount === 1) return res.status(200).send('Usuário deletado com sucesso!')
    }
  } catch (error) {    
    res.status(500).send('Erro desconhecido tentando atualizar dados do usuário no BD')
  }

  return res.status(400).json('Algum erro ocorreu')
})
 */
module.exports = router