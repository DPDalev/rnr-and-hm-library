import React, { Component } from 'react'
import requester from '../../infrastructure/requester'

export default class EditAlbum extends Component {

        editAlbum = (event) => {

        event.preventDefault()
                
        let year = document.getElementById('year').value
        let albumName = document.getElementById('albumName').value
        let artwork = document.getElementById('artwork').value

        console.log(year, albumName, artwork)

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


    }

    render () {
        return (
            <div>
                <br />
                <div>
                    <form onSubmit={this.editAlbum} className='form'>
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

//     render () {
//         console.log('Now we will edit an album')
//         return (
//             <div>
//                 <button onClick={this.editAlbum}>Edit</button>
//             </div>

//         )
//     }
// }