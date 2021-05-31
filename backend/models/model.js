const mongoose = require('mongoose')

let customerRacquet = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
/*     modelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Racquets"
    }, */
    annotation: String
})

let customer = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: String,
    address: String,
    obs: String,
    racquets: [customerRacquet]
})

const model = mongoose.model('Customer', customer, 'Customers')

module.exports = model