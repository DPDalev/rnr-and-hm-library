import React, { Component } from 'react';
import requester from './../../infrastructure/requester'
import observer from './../../infrastructure/observer'

export default class AddAlbum extends Component {

    constructor (props) {
        super (props)

        this.state = {
            'album': {
                'groupName': '',
                'albumName': '',
                'year': '',
                'artwork': ''
            },
        }
    }

    // Handles the change events in the form
    
    handleChange = (event) => {

        const album = this.state.album
        const name = event.target.name
        const value = event.target.value

        album[name] = value
        this.setState({album});
        
        //DEBUG
        console.log(this.state.album)
    }

    // Handles the submission of the form
    
    handleSubmit = (event) => {
        event.preventDefault()

        let albumdata = {
            'GroupName': this.state.album.groupName,
            'AlbumName': this.state.album.albumName,
            'Year': this.state.album.year,
            'Artwork': this.state.album.artwork
        }

        requester.post('appdata', 'albums', 'kinvey', albumdata)
            .then(() => {
                this.props.history.push('/allalbums')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Function to add albums to the database
    
    addAlbum = (event) => {

        event.preventDefault()
                
        let groupName = document.getElementById('groupName').value
        let albumName = document.getElementById('albumName').value
        let year = document.getElementById('year').value
        let artwork = document.getElementById('artwork').value

        let data = {
            'GroupName': groupName,
            'Year': year,
            'AlbumName': albumName,
            'Artwork': artwork
        }

        requester.post('appdata', 'albums', 'kinvey', data)
            .then(this.props.history.push('/allalbums'))
            .catch((error) => console.log(error))

        observer.trigger(observer.events.notification, {type: 'success', message: 'You successfully added new album!'})
        setTimeout(function () {observer.trigger(observer.events.hide)}, 4000)
    }

    render () {
        return (
            <div>
                <br />
                <div>
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
                            value='Enter'
                        />
                    </form>
                </div>
            </div>
        )
    }
}