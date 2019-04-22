import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import observer from './../../infrastructure/observer'
import requester from '../../infrastructure/requester';
import '../../styles/forms.css'

export default class LoginForm extends Component {
    constructor (props) {
        super (props)

        this.state = {
            user: {
                username: '',
                password: ''
            },
            error: ''
        }
    }

    handleChange = event => {
        this.setState({
            error: ''
        })
        const user = this.state.user
        const name = event.target.name
        const value = event.target.value

        user[name] = value
        this.setState({user});
        //DEBUG
        //console.log(this.state.user)
    }

    handleSubmit = event => {
        event.preventDefault()
        sessionStorage.clear()
           
        let userdata = {
            'username': this.state.user.username,
            'password': this.state.user.password
        }

        requester.post('user', 'login', 'basic', userdata)
            // .then(res => res.json())
            .then((data) => {
                sessionStorage.setItem('authtoken', data._kmd.authtoken);
                sessionStorage.setItem('username', this.state.user.username);
                sessionStorage.setItem('id', data._id)
                
                this.props.history.push('/home')

                observer.trigger(observer.events.notification, {type: 'success', message: 'You successfully logged in!'})
                setTimeout( function () {observer.trigger(observer.events.hide)}, 3000)
            })
            .catch((error) => {
                console.log("Error: ", error.status);
                if ( error.status === 401 ) {
                    this.setState({
                        error: 'Invalid credentials!'
                    })
                }
            })
    }

    componentWillUnmount () {
        
    }

    render () {

        const title = <div><h1 className='title'>Log in:</h1></div>

        return (
            <div className='form-container'>
                {title}
                <div className='error'>{this.state.error}</div>

                <div className='form-subcontainer'>
                    <form onSubmit={this.handleSubmit} className='form'>
                        <label>
                        Username:
                        <br />
                        <input
                            type='text'
                            name='username'
                            value={this.state.user.username}
                            onChange={this.handleChange}
                        />
                        <br />
                        <label>
                            Password:
                            <br />
                        </label>
                        <input
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            onChange={this.handleChange}
                        />
                        </label>
                        <br />
                        <input
                            type='submit'
                            value='Enter'
                        />
                        <p className='signinSentence'>If you don't have an account, please, sign in <Link to='/signin'>here.</Link></p>
                    </form>
                </div>
                
            </div>
        )
    }
}