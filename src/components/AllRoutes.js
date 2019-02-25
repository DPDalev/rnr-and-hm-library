import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import About from './About';
import AllAlbums from './data/AllAlbums';
import AddAlbum from './data/AddAlbum';
import Contact from './common/Contact';
import LoginForm from './forms/LoginForm';
import SignInForm from './forms/SignInForm'
import EditAlbum from './data/EditAlbum';

export default class AllRoutes extends Router {
  
  render() {
    return (
      <div>
        <Route path='/' exact component={Home} />
        <Route path='/addalbum' component={AddAlbum} />
        <Route path='/allalbums' component={AllAlbums} />
        <Route path='/home' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/login' component={LoginForm} />
        <Route path='/signin' component={SignInForm} />
        <Route path='/editalbum' component={EditAlbum} />

      </div>

    )
  }
}

