import React from 'react';
import { Link } from 'react-router-dom';
import './../../styles/footer.css'

const Footer = () => (
    <div>
        <footer className='Footer'>
            <h3>&copy; Copyright 2018   Dimitar Dalev</h3>
            <Link to='/contact' className='FooterLink'>Contact</Link>
        </footer>
    </div>
)

export default Footer;
