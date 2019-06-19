if(process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURI: process.env.MONGOURI,
        secretOrKey: process.env.SECRETORKEY,
        senderEmail: process.env.SENDEREMAIL,
        senderPassword: process.env.SENDERPASSWORD
    }
}
else {
    module.exports = {
        mongoURI: 'mongodb://rupermurder:rupermurder2019@ds231956.mlab.com:31956/happyhour',
        secretOrKey: 'secret',
        senderEmail: 'happyhourcodelnapp@gmail.com',
        senderPassword: 'happyhour2019'
    }
}
