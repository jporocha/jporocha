const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const MailService = require("../helpers/nodemailer");

module.exports = class MessageService {
  constructor() {}

  static async NewMessage(message) {
    try {
      let response = new Message(message);
      await response.save();
      let text = `Nova mensagem de ${message.sentBy}:\n\n${message.content}\n\nE-mail: ${message.email}\nTelefone: ${message.phone}`;
      let mail = await MailService(message.email, "Nova mensagem", text);
      if (mail.rejected.length) throw "Falha no envio de mensagem";
      return {
        payload: "Mensagem enviada com sucesso.",
        statusCode: 201,
      };
    } catch (e) {
      console.log("Erro em NewMessage:", e);
      return {
        payload: "Falha no envio de mensagem",
        statusCode: 400,
      };
    }
  }

  static async FetchMessages() {
    try {
      const messages = await Message.find();
      return {
        payload: messages,
        statusCode: 201,
      };
    } catch (e) {
      console.log("Erro em FetchMessages:", e);
      return {
        payload: "Falha na busca de mensagens",
        statusCode: 400,
      };
    }
  }

  static async EditMessage(id, changes) {
    try {
      let response = await Message.updateOne({ _id: id }, changes);
      if (response.n === 1)
        return {
          payload: "Alterações efetuadas com sucesso.",
          statusCode: 201,
        };
      throw "Mensagem não foi encontrada.";
    } catch (e) {
      console.log("Erro em EditMessage:", e);
      return {
        payload: "Falha na edição de mensagem",
        statusCode: 400,
      };
    }
  }
};
