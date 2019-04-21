import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'

export default class EditAlbum extends Component {

    constructor (props) {
        super (props)

        this.state = {
            'album': {
                'groupName': '',
                'albumName': '',
                'year': '',
                'artwork': ''
            },
            'albumid': ''
        }
    }

    handleChange = (event) => {

        const album = this.state.album
        const name = event.target.name
        const value = event.target.value

        album[name] = value
        this.setState({album});
        
        //DEBUG
        console.log(this.state.album)
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let id = this.props.match.params.id
           
        let albumdata = {
            'GroupName': this.state.album.groupName,
            'AlbumName': this.state.album.albumName,
            'Year': this.state.album.year,
            'Artwork': this.state.album.artwork
        }

        requester.update('appdata', `albums/${id}`, 'kinvey', albumdata)
            .then(() => {
                this.props.history.push('/allalbums')
                
                observer.trigger(observer.events.notification, {type: 'success', message: 'The album information was successfully updated!'})
                setTimeout( function () {observer.trigger(observer.events.hide)}, 3000)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentWillMount () {

        let id = this.props.match.params.id
        
        this.setState({
            'albumid': id
        })

        console.log('Album Id ot state', this.state.albumid)

        requester.get('appdata', `albums/${id}`, 'kinvey', '')
            .then(data => {
                this.setState({
                    album: {
                        'groupName': data.GroupName,
                        'albumName': data.AlbumName,
                        'year': data.Year,
                        'artwork': data.Artwork
                    }
                })
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
                    <form onSubmit={this.handleSubmit} className='form'>
                        Group Name:
                        <br />
                        <input
                            type='text'
                            name='groupName'
                            id='groupName'
                            defaultValue={this.state.album.groupName}
                            onChange={this.handleChange}
                        />
                        <br />
                        Album Name:
                        <br />
                        <input
                            type='text'
                            name='albumName'
                            id='albumName'
                            value={this.state.album.albumName}
                            onChange={this.handleChange}
                        />
                        <br />
                        Year:
                        <br />
                        <input
                            type='text'
                            name='year'
                            id='year'
                            value={this.state.album.year}
                            onChange={this.handleChange}
                        />
                        <br />
                        Artwork:
                        <br />
                        <input
                            type='text'
                            name='artwork'
                            id='artwork'
                            value={this.state.album.artwork}
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
