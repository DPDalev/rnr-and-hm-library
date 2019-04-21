import React from 'react'
import './../../styles/about.css'


// Returns links to YouTube

const About = () => (
    <div className='about' title='I am a title of the About page.'>
        <div><h1 className='title'>This is all about!</h1></div>
        <div className='iframe'>
        <iframe title='music' width="462" height="347" src="https://www.youtube.com/embed/9qbRHY1l0vc">
        </iframe>
        <iframe title='music' width="462" height="347" src="https://www.youtube.com/embed/ZDc8_fm5JAc">
        </iframe>
        <iframe title='music' width="462" height="347" src="https://www.youtube.com/embed/OEptxlP2Jrg">
        </iframe>
        <iframe title='music' width="462" height="347" src="https://www.youtube.com/embed/BLj16BeZ07I?t=32">
        </iframe>
        </div>
    </div>
)

export default About