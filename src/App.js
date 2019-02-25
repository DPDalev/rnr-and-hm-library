import React, { Component } from 'react';
import Footer from './components/common/footer';
import Header from './components/common/header';
import AllRoutes from './components/AllRoutes';
import Notification from './components/common/notification';
//import EditAlbum from './components/data/EditAlbum';
//import Toogle from './components/common/Togle';

import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AllRoutes />
        <Notification />
        {/* <Toogle /> */}
        <Footer />
      </div>
    );
  }
}
