import React, { Component } from 'react';
import requester from './../../infrastructure/requester'
import observer from './../../infrastructure/observer'
//import './../../../app.css'

export default class Toogle extends Component {

    handleClick = () => {
        console.log('Button is clicked')
        setTimeout(this.logout, 10000)
    }

    logout = () => {
        requester.post('user', '_logout', '', '');
        sessionStorage.clear();
        window.location.href = '/home';
        observer.trigger(observer.events.notification, {type: 'success', message: 'You successfully logged out!'})
        setTimeout(function () {observer.trigger(observer.events.hide)}, 4000)
    }

    render () {
        return (
            <div onMouseMove={this.handleClick}>Move the cursor over me</div>
        )
    }
}
