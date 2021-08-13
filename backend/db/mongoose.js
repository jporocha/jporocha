const mongoose = require('mongoose')

const connectionString=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@tcc.uzrpa.mongodb.net/neomecanica`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Falha na conexão:'));
db.once('open', function() {
  console.log('Conexão à base de dados estabelecida com sucesso...')
});