import React, { Component } from 'react';
import requester from '../../infrastructure/requester'
import observer from './../../infrastructure/observer'
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './../../styles/allAlbums.css'

export default class AllAlbums extends Component {
    constructor (props) {
        super (props)
        
        this.state = {
            albums: [],
            favouriteAlbums: [],
            message: null
        }
    }

    deleteAlbum = (albumid) => {

        let correctedAlbums = []
        let endpoint = 'albums/' + albumid; 

        requester.remove('appdata', endpoint, 'kinvey')
            .then(data =>  {
                correctedAlbums = this.state.albums.filter(a => a._id !== albumid)
                this.setState({albums: correctedAlbums})
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    addToFavourites = (albumid) => {

        observer.trigger(observer.events.notification, {type: 'loading', message: 'Loading...'})

        requester.get('user', sessionStorage.getItem('id'), 'kinvey', )
            .then(data => {

                console.log("Favourites: ", data.favourites)

                let localFavourites = data.favourites || [];

                if(localFavourites.includes(albumid)) {

                    observer.trigger(observer.events.notification, {type: 'error', message: 'This album is already on your Favourites list!'})
                    setTimeout(function () {observer.trigger(observer.events.hide)}, 2000) 

                    console.log('This album is already in your favourites')
                } else {
                    localFavourites.push(albumid)
                    let data = {
                        'favourites': localFavourites
                    }
                    observer.trigger(observer.events.notification, {type: 'success', message: 'This album was added to your Favourites!'})
                    setTimeout(function () {observer.trigger(observer.events.hide)}, 2000)    

                    requester.update('user', sessionStorage.getItem('id'), 'kinvey', data)
                }

            })
    }

    componentDidMount () {
        requester.get('appdata', 'albums', 'kinvey', '')
            .then(data => {
                this.setState({albums: data})
            })
    }

    render () {

        const userid = sessionStorage.getItem('id')

        const title = <div><h1 className='title'>All albums</h1></div>

        const albums = this.state.albums.map(a => (
            <div key = {a._id} className='AllAlbums'>
                    <img src={a.Artwork} alt='Artwork' className='Artworks'></img>
                    <p>Group: <strong>{a.GroupName}</strong></p>
                    <p>Album name: <strong>{a.AlbumName}</strong></p>
                    <p>Year: <strong>{a.Year}</strong></p>


                { userid === '5c3b168c51da6777908419f3' ? <button className='button' id='editButton' value={a._id}><Link to={`/editalbum/${a._id}`}>Edit</Link></button> : null}
                { userid === '5c3b168c51da6777908419f3' ? <button className='button' id='deleteButton' value={a._id} onClick={() => this.deleteAlbum(a._id)}>Delete</button> : null}
                { userid !== '5c3b168c51da6777908419f3' ? <button className='button' id='addToFavorites' value={a._id} onClick={() => this.addToFavourites(a._id)}>Add to favorites</button> : null}
            </div>
        ) || null)

        return (
            <div>
                {title}
                {albums}
            </div>
        )
    }
}