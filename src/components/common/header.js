import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import logo from './../../images/DDDevelopment_Logo.jpg'
import requester from './../../infrastructure/requester';
import observer from './../../infrastructure/observer'
import './../../styles/header.css'

export default class Header extends Component {
   
    logout = () => {
        requester.post('user', '_logout', '', '');
        sessionStorage.clear();
        observer.trigger(observer.events.notification, {type: 'success', message: 'You successfully logged out!'})
        setTimeout(function () {observer.trigger(observer.events.hide)}, 4000)
    }

    render() {

        const isAuth = sessionStorage.getItem('authtoken')

        return (
            <div>
                <header className='header-container'>
                        <div className='logo'>
                            <Link to='/about'><img src={logo} alt='DDDevelopment logo'/></Link>
                        </div>
                </header>
                <nav className='nav-container'>
                        <ul >
                            <li><Link to="/home" className='link'>Home</Link></li>
                            <li><Link to="/about" className='link'>About</Link></li>

                            {isAuth !== null ? <li> <Link to='/allalbums' className='link'>All albums</Link></li> : null}

                            {isAuth !== null ? <li> <Link to='/addalbum' className='link'>Add album</Link></li> : null}

                            {isAuth !== null ? <li> <Link to='/styles' className='link'>Styles</Link></li> : null}

                            {isAuth === null ? <li> <Link to='/login' className='link'>Login</Link></li> : null}

                            {isAuth === null ? <li> <Link to='/signin' className='link'>Signin</Link></li> : null}
                                
                            {isAuth !== null ? <li> <Link to='/home' onClick={this.logout} className='link'>Log out </Link></li> : null}

                            {isAuth !== null ? <span className='welcome'> Welcome {sessionStorage.getItem('username')}!</span> : null}
                        </ul>
                </nav>
            </div>
        )
    }
}
