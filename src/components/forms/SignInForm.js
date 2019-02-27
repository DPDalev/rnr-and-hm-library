import React, { Component } from 'react'
import requester from './../../infrastructure/requester';
import observer from './../../infrastructure/observer'
import './../../styles/forms.css'
import './../../styles/notifications.css'

export default class LoginForm extends Component {
    constructor (props) {
        super (props)

        this.state = {
            user: {
                username: '',
                password: ''
            },
            error: ''           
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        this.repassword = document.getElementById('repassword').value
        //DEBUG
        console.log(`Username: ${this.state.user.username} Password: ${this.state.user.password} Repassword: ${this.repassword}`)
    }

    handleSubmit = event => {
        event.preventDefault();
        sessionStorage.clear()

        if (this.state.user.username.length < 4) {
            // this.setState({
            //     error: 'Username must be at least 4 symbols'
            // })

            observer.trigger(observer.events.notification, {type: 'error', message: 'Username must be at least 4 symbols!'})
            setTimeout(function () {observer.trigger(observer.events.hide)}, 4000)
            return
            
        } else if ( this.state.user.password.length < 6 ) {
            this.setState({
                error: 'Password must be at least 6 symbols'
            })
            return
        } else if ( this.state.user.password !== this.repassword ) {
            this.setState({
                error: 'Passwords do not match!'
            })
            return
        }

        console.log("userdata:")
        console.log(this.state.user)
        
        
        let userdata = {
            'username': this.state.user.username,
            'password': this.state.user.password
        }

        requester.post('user', '', 'basic', userdata)
        .then((data) => {
            console.log(data);
            sessionStorage.setItem('authtoken', data._kmd.authtoken);
            sessionStorage.setItem('username', this.state.user.username);
            this.props.history.push('/home')
        })
        .catch((error) => {
            console.log(error.status);
            if ( error.status === 409 ) {
                this.setState({
                    error: "This suername is already taken."
                })
            }
        })

        observer.trigger(observer.events.notification, {type: 'success', message: 'You successfully signed in!'})
        setTimeout(function () {observer.trigger(observer.events.hide)}, 4000)
    }

    render () {
        return (
            <div>
                <div className='error'>{this.state.error}</div>
                <div className='form-container'>
                    <form onSubmit={this.handleSubmit} className='form'>
                        <label>
                            Username:
                            <br />
                        </label>
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
                        <input
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            onChange={this.handleChange}
                        />
                        <br />
                            Re-enter Password:
                            <br />
                        <input
                            type='password'
                            name='repassword'
                            id='repassword'
                            onChange={this.handleChange}
                        />
                        <br />
                    </label>
                        <input
                            type='submit'
                            value='Enter'
                        />
                    </form>
                </div>
            </div>
        )
    }
}