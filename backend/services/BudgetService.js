const BudgetModel = require("../models/BudgetModel");
const S3 = require("aws-sdk/clients/s3");

module.exports = class BudgetService {
  constructor() {}

  static async CreateJob(job) {
    try {
      let response = new BudgetModel(job);
      await response.save();
      return {
        payload: "Serviço salvo com sucesso.",
        statusCode: 201,
      };
    } catch (e) {
      console.log("Erro em NewJob:", e);
      return {
        payload: "Falha na criação do serviço.",
        statusCode: 400,
      };
    }
  }

  static async DownloadAttachment(key) {
    try {
      const service = new S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_KEY,
      });
      const params = {
        Bucket: process.env.AWS_S3BUCKET,
        Key: key,
      };
      return new Promise((resolve, reject) => {
        service.getObject(params, (err, data) => {
          if (err) {
            console.log("Erro na busca de anexo:", err);
            reject({
              statusCode: 400,
              payload: "Erro na criação de anexo",
            });
          }
          resolve({
            statusCode: 201,
            payload: data,
          });
        });
      });
    } catch (e) {
      console.log("Erro em DownloadAttachment:", e);
      return {
        payload: "Falha na busca de arquivo.",
        statusCode: 400,
      };
    }
  }

  static async CreateAttachment(id, file, filename, mimetype, validade) {
    try {
      const service = new S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_KEY,
      });
      let budget = await BudgetModel.findById(id);
      const params = {
        Bucket: process.env.AWS_S3BUCKET,
        Key: `${budget._id}-${budget.bucketCounter}`,
        Body: file,
      };
      return new Promise((resolve, reject) => {
        service.upload(params, async (err, data) => {
          if (err) {
            console.log("Erro:", err);
            reject({
              statusCode: 400,
              payload: "Erro na criação de anexo",
            });
          }
          let newFile = {
            filename,
            validade,
            mimetype,
            key: params.Key,
          };
          budget.bucketCounter++;
          budget.anexos.push(newFile);
          await budget.save();
          resolve({
            statusCode: 201,
            payload: "Anexo salvo com sucesso",
          });
        });
      });
    } catch (e) {
      console.log("Erro em CreateAttachment:", e);
      return {
        payload: "Falha na criação do anexo.",
        statusCode: 400,
      };
    }
  }

  static async FetchJobs(id) {
    try {
      const budgets = id
        ? await BudgetModel.find({ client: id })
            .populate("client")
            .populate("profissionalHabilitado")
        : await BudgetModel.find()
            .populate("client")
            .populate("profissionalHabilitado");
      return {
        payload: budgets,
        statusCode: 201,
      };
    } catch (e) {
      console.log("Erro em FetchJobs:", e);
      return {
        payload: "Falha na busca de serviços",
        statusCode: 400,
      };
    }
  }
};
