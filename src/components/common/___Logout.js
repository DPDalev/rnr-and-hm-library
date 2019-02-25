import React, { Component } from 'react'
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer'


export default class Logout extends Component {

    handleSubmit = () => {
        requester.post('user', '_logout', '', '');
        sessionStorage.clear();
        
        observer.trigger(observer.events.notification, {type: 'success', message: 'You successfully logged out!'})
        setTimeout(function () {observer.trigger(observer.events.hide)}, 4000)

        // observer.trigger(observer.events.notification, {type: 'success', message: 'You successfully logged in!'})
        // setTimeout(function () {observer.trigger(observer.events.hide)}, 3000)
    }

    render () {
        return (
            <div>
                <button onClick={this.handleSubmit}> Log out </button>
                <h3>You are logged out!</h3>
            </div>
        )
    }
    
}