import React, { Component } from 'react'
// import keys from '../config/keys'
// const keys = require('../config/keys')

class Login extends Component {
    constructor() {
        super()

        this.state = {
            usernameOrEmail: '',
            password: '',
            count: 1
        }
    }

    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        let userData = {
            usernameorEmail: this.state.usernameOrEmail,
            password: this.state.password
        }

        let { password } = this.state
        // console.log(password)
        // let paragraph = 'The quick brown fox jumps over the lazy dog. It barked.'
        let regex = /[a-z]/g
        // let valid = password.match(regex)
        let valid = true

        // check for length > 16
        // if(password.length > 16){
        //     valid = true
        // }
        // else {
        //     valid = false
        // return
        // }
        // /[ !@#$%^&*()_+\-=\[\];':"\\|,.<>\/?]{2}/g
        let symbols = /[ !@#$%^&*()_+\-=\[\];':"\\|,.<>\/?]{2}/g
        // check for symbols
        // if(password.match(symbols) == null){
        //     valid = false
        //     return
        // }
        // else {
        //     valid = true
        // }

        // check for numbers
        // let numbers = /[0-9]{2}/g
        // if(password.match(numbers) == null){
        //     valid = false
        //     return
        // }

        // check for lower chars
        let lowerCharacters = /[a-z]/g
        // if(password.match(lowerCharacters) == null){
        //     console.log('false')
        // }
        // else {
        //     console.log('true')
        // }


        // check uppercase for 2 first chars
        let upperTwoFirstChars = /^[A-Z]{2}/
        // if(password.match(upperTwoFirstChars) == null){
        //     console.log('false')
        // }
        // else {
        //     console.log('true')
        // }
        // console.log(password.match(numbers))


        // off
        // console.log(password.toUpperCase())
        let repeatedChars = /[A-Z]{2}/
        // if(password.toUpperCase().match(repeatedChars) == null){
        //     console.log('false')
        // }
        // else {
        //     console.log('true')
        // }

        // off
        let ambiguousChars = /[ (){}[]\[\];':",.<>\/?]/g
        // /[ (){}[]\[\];':",.<>\/?]/g
        // {}[]()/\'"`~,;:.<>

        console.log(password)
        // if(password.match(ambiguousChars) !== null){
        //     console.log('false')
        // }
        // else {
        //     console.log('true')
        // }

        this.setState({ count: this.state.count + 1 })



        if (password == 'password') {
            alert('login successful')
            return
        }
        else {
            alert('incorrect')
        }

        let userIp


        if (this.state.count == 3) {

            fetch('https://api.ipify.org?format=json')
                .then(res => res.json())
                .then(data => {
                    userIp = data.ip
                    console.log(userIp)
                    alert(`send email to real user with ip ${data.ip}`)
                }
                )
                .catch(err => console.log(err))
            return
        }

        // console.log(valid)
        // console.log(password.match(containsCharacters))
        // password.match(symbols) == null ? valid = false : valid = true

    }

    sendAlertEmail = () => {
        const nodemailer = require('nodemailer');
        const transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: '',
                pass: 'myGmailPassword',
            },
        });
        const mailOptions = {
            from: 'thisdavejdemo@gmail.com',
            to: 'thisdavejdemo@gmail.com',
            subject: 'hello world!',
            html: 'hello world!',
        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            console.log(`Message sent: ${info.response}`);
        });
    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mx-auto bg-light mt-5 p-5 rounded'>
                        <form>
                            <fieldset>
                                <legend className='display-4 pb-4'>Login</legend>
                                <div className='form-group'>
                                    <label htmlFor='usernameOrEmail'>Username or Email</label>
                                    <input type='text' className="form-control" id='usernameOrEmail' placeholder='Enter username or email' onChange={this.onInputChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' className="form-control" id='password' placeholder='Password' onChange={this.onInputChange} />
                                </div>
                                <button type='submit' className='btn btn-primary' onClick={this.onFormSubmit} >Submit</button>
                                <button type='button' className='btn btn-link d-block' style={{ paddingLeft: '0%', marginLeft: '0%', textDecoration: 'none' }}></button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login