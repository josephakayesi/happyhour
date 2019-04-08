const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema 
const BarAccountLogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    ip: { type: String, required: true },
    timeTillUnbarred: { type: Date, default: new Date(new Date().setMinutes(new Date().getMinutes() + 5)) },
})

module.exports = BarAccountLog = mongoose.model('barAccountLogs', BarAccountLogSchema)