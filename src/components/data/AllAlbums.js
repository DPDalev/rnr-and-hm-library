import React, { Component } from 'react';
import requester from './../../infrastructure/requester'
import './../../styles/allAlbums.css'

export default class AllAlbums extends Component {
    constructor (props) {
        super (props)
        
        this.state = {
            albums: []
        }
    }

    deleteAlbum = (albumid) => {

        let correctedAlbums = []
        let endpoint = 'albums/' + albumid; 

        requester.remove('appdata', endpoint, 'kinvey')
            .then(data =>  {correctedAlbums = this.state.albums.filter(a => a._id !== albumid)
                    this.setState({albums: correctedAlbums})

            })

        // fetch(url, {    
        //     method : 'DELETE',
        //     headers: {
        //         Authorization: 'Kinvey ' + sessionStorage.getItem('authtoken'),
        //         'Content-Type': 'application/json'
        //     },
        // })
    }

    editAlbum = (albumid) => {
        console.log('edit')
        console.log(albumid)
        this.props.history.push('/editalbum')
    }

    componentWillMount () {
        requester.get('appdata', 'albums', 'kinvey', '')
        .then(data => {this.setState({albums: data})
        })
    }

    render () {

        const id = sessionStorage.getItem('id')

        const albums = this.state.albums.map(a => (
            <div key = {a._id} className='AllAlbums'>
                <img src={a.Artwork} alt='Artwork' className='Artworks'></img>
                <p>Album name: <strong>{a.AlbumName}</strong></p>
                <p>Year: <strong>{a.Year}</strong></p>
                { id === '5c3b168c51da6777908419f3' ? <button id='editButton' value={a._id} onClick={this.editAlbum}>Edit</button> : null}
                { id === '5c3b168c51da6777908419f3' ? <button id='deleteButton' albumId={a._id} onClick={() => this.deleteAlbum(a._id)}>Delete</button> : null}
                { id !== '5c3b168c51da6777908419f3' ? <button id='addToFavorites' value={a._id} onClick={this.editAlbum}>Add to favorites</button> : null}
            </div>
        ))
            console.log("Albums length: ", albums.length)
        return (
            <div>
                { (albums.length !== 0) ? <div>{albums}</div> : <h1>No albums in the database...</h1> }
            </div>
        )
    }
}