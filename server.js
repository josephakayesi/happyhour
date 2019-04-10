const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport =  require('passport')
const keys = require('./config/keys')

const users = require('./routes/api/users')

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Db config
const db = require('./config/keys').mongoURI

// Connect to mongoDB
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected'))
    .catch(() => console.log(err))

// Passport middleware
app.use(passport.initialize())

//Passport config
require('./config/passport')(passport)

app.get('/', (req, res) => res.send('Hello'))

// Use routes
app.use('/api/users', users)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))