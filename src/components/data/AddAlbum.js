import React, { Component } from 'react';
import requester from './../../infrastructure/requester'
import observer from './../../infrastructure/observer'

export default class AddAlbum extends Component {
    // constructor (props) {
    //     super (props)
    // }
   


    addAlbum = (event) => {

        event.preventDefault()
                
        let year = document.getElementById('year').value
        let albumName = document.getElementById('albumName').value
        let artwork = document.getElementById('artwork').value

        let data = {
            'Year': year,
            'AlbumName': albumName,
            'Artwork': artwork
        }

        requester.post('appdata', 'albums', 'kinvey', data)
        .then(this.props.history.push('/allalbums'))
        .catch((error) => console.log(error))

        document.getElementById('year').value = '';
        document.getElementById('albumName').value = '';
        document.getElementById('artwork').value = ''

        observer.trigger(observer.events.notification, {type: 'success', message: 'You successfully added new album!'})
        setTimeout(function () {observer.trigger(observer.events.hide)}, 4000)
    }

    render () {
        return (
            <div>
                <br />
                <div>
                    <form onSubmit={this.addAlbum} className='form'>
                        Year:
                        <br />
                        <input
                            type='text'
                            name='year'
                            id='year'
                        />
                        <br />
                        Album Name:
                        <br />
                        <input
                            type='text'
                            name='albumName'
                            id='albumName'
                        />
                        <br />
                        Artwork:
                        <br />
                        <input
                            type='text'
                            name='artwork'
                            id='artwork'
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