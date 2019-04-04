const app = require('express')()
const mongoose = require('mongoose')
const users = require('../routes/api/users')

// Db config
const db = require('../config/keys').mongoURI

// Connect to mongoDB
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected'))
    .catch(() => console.log(err))
    app.get('/', (req, res) => res.send('Hello'))

// Use routes
app.use('/api/users', users)

const port = process.env.PORT || 5000 

app.listen(port, () => console.log(`Server running on port ${port}`))