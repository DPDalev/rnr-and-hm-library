import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import observer from './../../infrastructure/observer'

export default class MyFavourites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myFavouritesIds: [],  //Фаворитите на юзъра от user.favorites
            albumsToRender: [],
            message: null   //
        }
    }

    // Gets favourites IDs from Kinvey user's profile
    
    getFavouritesIds = (userid) => {
        requester.get('user', userid, 'kinvey', '')
        .then(user => {
            this.setState({
                myFavouritesIds: user.favourites
            })
        })
    }

    // Gets albums from Kinvey Albums, checks favourites IDs and pushes for rendering
    
    getAlbumsFromKinvey = () => {
        let bufferOfAlbums = []
        
        requester.get('appdata', 'albums', 'kinvey', '')
        .then(albums => {
                albums.forEach(album => {
                    if(this.state.myFavouritesIds.includes(album._id)) {
                        bufferOfAlbums.push(album)
                    }
                });
            this.setState({
                    albumsToRender: bufferOfAlbums
                })
            })
    }

    componentDidMount () {

        let userid = sessionStorage.getItem('id')

        console.log('userid: ', userid)

        observer.trigger(observer.events.notification, {type: 'loading', message: 'Loading...'})

        requester.get('user', userid, 'kinvey', '')

        .then(user => {
            console.log("user.favourites", user.favourites)
            this.setState({
                myFavouritesIds: user.favourites
            })
        })
        .then(() => {
            
            let bufferOfAlbums = []
        
            // Gets all albums for comparison with Favourites
            
            requester.get('appdata', 'albums', 'kinvey', '')
                .then(albums => {

                    observer.trigger(observer.events.hide)
        
                    console.log("Albums bbb: ", albums)
        
                        albums.forEach(album => {
                            if(this.state.myFavouritesIds.includes(album._id)) {
                                bufferOfAlbums.push(album)
                            }
                        });

                        this.setState({
                            albumsToRender: bufferOfAlbums
                        })

                        if(this.state.albumsToRender.length === 0) {
                            // message = 'Your Favourites list is empty!'
                            this.setState({
                                message: <div><h1 className='emptyListMessage'>Your Favourites list is empty!</h1></div>
                            })    
                        }
                    })
            })
    }


    //REMOVE FROM FAVOURITES
    removeFromFavourites = (albumid) => {

        observer.trigger(observer.events.notification, {type: 'loading', message: 'Removing the album from your Favourites...'})

        let userid = sessionStorage.getItem('id');
      
        requester.get('user', userid, 'kinvey', ) //Взима масива с ID-тата на Favourites
            .then(res => {
                let correctedFavourites = res.favourites.filter(a => a !== albumid) || []

                this.setState({
                    myFavouritesIds: correctedFavourites,
                    //albumsToRender: correctedFavourites
                })
            })

            .then(() => {
                let data = {favourites: this.state.myFavouritesIds}

                requester.update('user', userid, 'kinvey', data)
                
                    .then(res => {
                        let bufferOfAlbums = []
                                
                        requester.get('appdata', 'albums', 'kinvey', '')
                            .then(res => {
                        
                            let albums = res || [];
        
                            if(albums === []) {
                                bufferOfAlbums = []
                            } else {
                                albums.forEach(album => {
                                    console.log("GAFK Element: ", album._id)
                                    if(this.state.myFavouritesIds.includes(album._id)) {
                                        bufferOfAlbums.push(album)
                                    }
                                });
                            }
                            this.setState({
                                albumsToRender: bufferOfAlbums
                            })

                            if(this.state.albumsToRender.length === 0) {
                                // message = 'Your Favourites list is empty!'
                                this.setState({
                                    message: <div><h1 className='emptyListMessage'>Your Favourites list is empty!</h1></div>
                                })    
                            }
                            observer.trigger(observer.events.hide) 
                        })
                      
                    })
            })
    }

    render() {

        const title = <div><h1 className='title'>My Favourites</h1></div>

        console.log("Albums to render in Render(): ", this.state.albumsToRender)

        console.log("Message: ", this.state.message)

        const albums = this.state.albumsToRender.map(a => (

            <div key = {a._id} className='AllAlbums'>
                    <img src={a.Artwork} alt='Artwork' className='Artworks'></img>
                    <p>Group: <strong>{a.GroupName}</strong></p>
                    <p>Album name: <strong>{a.AlbumName}</strong></p>
                    <p>Year: <strong>{a.Year}</strong></p>
                    <button id='removeFromFavorites' value={a._id} onClick={() => this.removeFromFavourites(a._id)}>Remove from favorites</button>
            </div>
        ))

        return (
            <div>
                {title}
                {this.state.message}
                {albums}
            </div>
        )
    }
}