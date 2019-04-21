import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'


export default class EditAlbum extends Component {

    constructor (props) {
        super (props)

        this.state = {
            request: {
                'groupName': '',
                'albumName': '',
                'year': '',
                'artwork': ''
            }
        }
    }

    handleChange = (event) => {

        const request = this.state.request
        const name = event.target.name
        const value = event.target.value

        request[name] = value
        this.setState({request});
        
        //DEBUG
        console.log(this.state.request)

    }
    
    handleSubmit = (event) => {

        event.preventDefault()

        let data = {
            'UserID': sessionStorage.getItem('id'),
            'UserName': sessionStorage.getItem('username'),
            'GroupName': this.state.request.groupName,
            'AlbumName': this.state.request.albumName,
            'Year': this.state.request.year,
            'Artwork': this.state.request.artwork
        }

        console.log(data)

        requester.post('appdata', 'requests', 'kinvey', data)
            .then(() => {

                this.props.history.push('/allalbums')
                
                observer.trigger(observer.events.notification, {type: 'success', message: 'Your request to the Admin was sent.'})
                setTimeout( function () {observer.trigger(observer.events.hide)}, 3000)

                console.log('Аман!')
            })
            .catch((error) => {
                console.log(error)
            })

    }

    render () {
        return (
            <div>
                <br />
                <div>
                <h3>Please send request to the Admin</h3>
                    <form onSubmit={this.handleSubmit} className='form'>
                        Group Name:
                        <br />
                        <input
                            type='text'
                            name='groupName'
                            id='groupName'
                            onChange={this.handleChange}
                        />
                        <br />
                        Album Name:
                        <br />
                        <input
                            type='text'
                            name='albumName'
                            id='albumName'
                            onChange={this.handleChange}
                        />
                        <br />
                        Year:
                        <br />
                        <input
                            type='text'
                            name='year'
                            id='year'
                            onChange={this.handleChange}
                        />
                        <br />
                        Artwork:
                        <br />
                        <input
                            type='text'
                            name='artwork'
                            id='artwork'
                            onChange={this.handleChange}
                        />
                        <br />
                        <input
                            type='submit'
                            value='Submit'
                        />
                    </form>
                </div>
            </div>
        )
    }
}
