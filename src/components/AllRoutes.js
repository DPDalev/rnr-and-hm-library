import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './../styles/allRoutes.css'

import Home from './home'
import About from './common/About'
import AllAlbums from './data/AllAlbums'
import AddAlbum from './data/AddAlbum'
import LoginForm from './forms/LoginForm'
import SignInForm from './forms/SignInForm'
import EditAlbum from './data/EditAlbum'
import MyFavourites from './data/MyFavourites'
import ReqForm from './forms/ReqForm'
import AllRequests from './data/AllRequests';

export default class AllRoutes extends Router {
  
  render() {
    return (
      <div className='allRoutes'>
        <Route path='/' exact component={Home} />
        <Route path='/addalbum' component={AddAlbum} />
        <Route exact path='/allalbums' component={AllAlbums} />
        <Route path='/myfavourites' component={MyFavourites} />
        <Route path='/home' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/login' component={LoginForm} />
        <Route path='/signin' component={SignInForm} />
        <Route exact path='/editalbum/:id' component={EditAlbum} />
        <Route path='/sendrequest' component={ReqForm} />
        <Route path='/requests' component={AllRequests} />

      </div>

    )
  }
}

