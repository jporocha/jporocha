const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const pepper = process.env.PEPPER;
const mailer = require("../helpers/nodemailer");

if (!pepper) {
  console.log("Sem PEPPER nas variaveis de ambiente");
  process.exit(1);
}

let AddressSchema = new mongoose.Schema({
  nome: String,
  rua: String,
  numero: String,
  complemento: String,
  bairro: String,
  cep: String,
  cidade: String,
  estado: String,
  index: Number,
});

let ContactSchema = new mongoose.Schema({
  nome: String,
  position: String,
  phone: String,
  email: String,
  index: Number,
});

let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false, lowercase: true },
  role: { type: String, default: "cliente" },
  passwordHash: { type: String, required: false },
  facebookId: { type: Number, required: false },
  googleId: { type: Number, required: false },
  localStrategy: { type: Boolean, default: false },
  refreshPassToken: { type: String },
  cnpj: String,
  inscricao: String,
  razaoSocial: String,
  addr: {
    type: [AddressSchema],
    default: [],
  },
  contatos: {
    type: [ContactSchema],
    default: [],
  },
  mainAddress: {
    type: Number,
    default: -1,
  },
  mainContact: {
    type: Number,
    default: -1,
  },
});

// Para registro de estratégia local
userSchema.methods.createUser = async function (user) {
  try {
    let userExists = await mongoose
      .model("User")
      .findOne({ email: user.email, localStrategy: true });
    if (userExists) throw "E-mail já cadastrado.";
    user.passwordHash = await bcrypt.hash(user.password + pepper, 8);
    delete user.password;
    let newUser = new mongoose.model("User")(user);
    await newUser.save();
    return { user: "Usuário criado com sucesso." };
  } catch (e) {
    return { error: e };
  }
};

// Para login via social media
userSchema.methods.FindOrCreateUser = async function (user, userStrategy) {
  try {
    let userExists = await mongoose.model("User").findOne(userStrategy);
    if (userExists) return { user: userExists };
    let newUser = new mongoose.model("User")(user);
    await newUser.save();
    return { user: newUser };
  } catch (e) {
    return { error: e };
  }
};

// Para login via estratégia local
userSchema.methods.validateLogin = async function (user) {
  try {
    const userExists = await mongoose
      .model("User")
      .findOne({ email: user.email, localStrategy: true });
    if (!userExists) throw "Usuário ou senha inválidos.";
    const validateUser = await bcrypt.compare(
      `${user.password}${pepper}`,
      userExists.passwordHash
    );
    if (!validateUser) throw "Usuário ou senha inválidos.";
    return { user: userExists };
  } catch (e) {
    return { error: e };
  }
};

// Criar token de recuperação
userSchema.methods.createToken = async function (id) {
  try {
    const userExists = await mongoose.model("User").findById(id);
    userExists.refreshPassToken = crypto.randomBytes(20).toString("hex");
    await userExists.save();
    await mailer(
      userExists.email,
      "Seu token para recuperação de senha",
      userExists.refreshPassToken,
      userExists.refreshPassToken
    );
    return { msg: "Token criado com sucesso. Verifique seu e-mail." };
  } catch (e) {
    return { error: e };
  }
};

// Alterar senha
userSchema.methods.changePassword = async function (id, token, newPass) {
  try {
    let userExists = await mongoose.model("User").findById(id);
    if (!userExists) throw "Usuário não encontrado";
    if (!userExists.refreshPassToken || userExists.refreshPassToken != token)
      throw "Token inválido";
    userExists.passwordHash = await bcrypt.hash(newPass + pepper, 8);
    userExists.refreshPassToken = undefined;
    await userExists.save();
    return { msg: "Senha alterada com sucesso." };
  } catch (e) {
    return { error: e };
  }
};

const model = mongoose.model("User", userSchema, "Users");

module.exports = model;
