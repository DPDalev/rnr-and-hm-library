import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import requester from './../../infrastructure/requester'
import logo from './../../images/DDDevelopment_Logo.jpg'
import './../../styles/header.css'

export default class Header extends Component {
    constructor (props) {
        super (props)

        this.logout = this.logout.bind(this)
    }

    logout = () => {
        requester.post('user', '_logout', '', '');
        sessionStorage.clear()
    }

    render () {
        return (
            <header>
                <div className='header-container'>
                    <div className='logo'>
                        <Link to='/about'><img src={logo} alt='DDDevelopment logo'/></Link>
                    </div>
                    <div className='Header'>
                        <Link to='/home' className='HeaderLink'>Home</Link>
                        <Link to='/about' className='HeaderLink'>About</Link>
                        <Link to='/allalbums' className='HeaderLink'>All albums</Link>
                        <Link to='/addalbum' className='HeaderLink'>Add album</Link>
                        <Link to='/styles' className='HeaderLink'>Styles</Link>
                        <Link to='/login' className='HeaderLink'>Login</Link>
                        <Link to='/signin' className='HeaderLink'>Sign in</Link>
                        <Link to='/home' onClick={this.logout} className='HeaderLink'>Log out </Link>
                    </div>
                </div>
            </header>
        )
    }
}