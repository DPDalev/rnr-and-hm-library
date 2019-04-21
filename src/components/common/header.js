import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Notification from './../../components/common/notification'
import requester from './../../infrastructure/requester'
import observer from './../../infrastructure/observer'
import './../../styles/header.css'

export default class Header extends Component {
   
    // Log out function

    logout = () => {
        requester.post('user', '_logout', '', '');
        sessionStorage.clear();

        observer.trigger(observer.events.notification, {type: 'success', message: 'You successfully logged out!'})
        setTimeout(function () {observer.trigger(observer.events.hide)}, 3000)
    }

    // Links in the Header
    
    render() {

        const isAuth = sessionStorage.getItem('authtoken') || null;
        const admin = sessionStorage.getItem('id') === '5c3b168c51da6777908419f3';
        let welcome = <span className='welcome'></span>

        if (isAuth) {
            welcome = <span className='welcome'> Welcome, {sessionStorage.getItem('username')}!</span>
        }

        return (
            <header className='header-container'>
                <nav className='nav-container'>
                    <ul className='links-container'>
                        <li><Link to="/home" className='link'>Home</Link></li>
                        <li><Link to="/about" className='link'>About</Link></li>

                        {isAuth !== null ? <li> <Link to='/allalbums' className='link'>All albums</Link></li> : null}

                        {isAuth !== null && admin ? <li> <Link to='/addalbum' className='link'>Add album</Link></li> : null}

                        {isAuth !== null && !admin ? <li> <Link to='/myfavourites' className='link'>My favourites</Link></li> : null}
                        
                        {isAuth !== null && !admin ? <li> <Link to='/sendrequest' className='link'>Send request</Link></li> : null}

                        {isAuth !== null && admin ? <li> <Link to='/requests' className='link'>Requests</Link></li> : null}

                        {isAuth === null ? <li> <Link to='/login' className='link'>Log in</Link></li> : null}

                        {isAuth === null ? <li> <Link to='/signin' className='link'>Sign in</Link></li> : null}
                            
                        {welcome}
                                                
                        {isAuth !== null ? <li> <Link to='/home' onClick={this.logout} className='link'>Log out </Link></li> : null}

                        <Notification />
 
                     </ul>
                </nav>
            </header>
        )
    }
}
