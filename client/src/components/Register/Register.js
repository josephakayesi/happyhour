import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'

export default class Register extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
    }

    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        let userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        console.log(userData)
        axios.post('/api/users/register', userData)
            .then(res => console.log(res.data))
            .catch(err => this.setState({ errors: err.response.data }))
    }

    render() {
        const { errors } = this.state
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mx-auto bg-light mt-5 p-5 rounded'>
                        <form>
                            <fieldset>
                                <legend className='display-4 pb-4'>Login</legend>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input type='text' className={classnames('form-control', { 'is-invalid': errors.name })} id='name' placeholder='Enter name' value={this.state.name} onChange={this.onInputChange} />
                                    {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' className={classnames('form-control', { 'is-invalid': errors.email })} id='email' placeholder='Enter email' value={this.state.email} onChange={this.onInputChange} />
                                    {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' className={classnames('form-control', { 'is-invalid': errors.password })} id='password' placeholder='Enter password' value={this.state.password} onChange={this.onInputChange} />
                                    {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='confirmPassword'>Confirm Password</label>
                                    <input type='password' className={classnames('form-control', { 'is-invalid': errors.confirmPassword })} id='confirmPassword' placeholder='Enter password again' value={this.state.confirmPassword} onChange={this.onInputChange} />
                                    {errors.confirmPassword && (<div className='invalid-feedback'>{errors.confirmPassword}</div>)}
                                </div>
                                <button type='submit' className='btn btn-primary' onClick={this.onFormSubmit}>Submit</button>
                                <button type='button' className='btn btn-link d-block' style={{ paddingLeft: '0%', marginLeft: '0%', textDecoration: 'none' }}><small className='form-text' onClick={this.props.toggleLoginOrRegisterComponent}>Login instead ?</small></button>
                            </fieldset>
                        </form>
                    </div> 
                </div>
            </div>
        )
    }
}
