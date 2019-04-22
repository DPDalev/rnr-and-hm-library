import React, { Component } from 'react'
import requester from './../../infrastructure/requester'
import './../../styles/allRequests.css'

export default class AllRequests extends Component {

    constructor(props) {
        super(props)

        this.state = {
            requests: []
        }
        
    }

    // Deletes user's request from the list

    deleteRequest = (requestid) => {

        let correctedRequests = []
        let endpoint = 'requests/' + requestid; 

        requester.remove('appdata', endpoint, 'kinvey')
            .then(data =>  {
                correctedRequests = this.state.requests.filter(r => r._id !== requestid)
                this.setState({requests: correctedRequests})
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount () {
        requester.get('appdata', 'requests', 'kinvey', '')
            .then(data => {
                    this.setState({
                        requests: data
                    })
                })
    }

    render () {

        let requests = this.state.requests.map(r => (
            <tr key = {r._id} className='table'>
                <td>{r.UserName}</td>
                <td>{r.GroupName}</td>
                <td>{r.AlbumName}</td>
                <td>{r.Year}</td>
                <td>{r.Artwork}</td>
                <td><button value={r._id} onClick={() => this.deleteRequest(r._id)}>Delete</button></td>
            </tr>
        ) || null)

        return (
            <div className="container">
				<table id="requests" className="table">
					<thead>
						<tr>
							<th style={{ 'width': '10%' }}>Sender</th>
							<th style={{ 'width': '30%' }}>Group</th>
							<th style={{ 'width': '20%' }}>Album</th>
							<th style={{ 'width': '20%' }}>Year</th>
							<th style={{ 'width': '30%' }}>Artwork</th>
							<th style={{ 'width': '30%' }}></th>
						</tr>
					</thead>
                        <br />
                    <tbody>
                        {requests}
                    </tbody>
				</table>
			</div>
        )
    }
}