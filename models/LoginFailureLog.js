const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema 
const LoginFailureLogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    ip: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = LoginFailureLog = mongoose.model('loginFailureLogs', LoginFailureLogSchema)