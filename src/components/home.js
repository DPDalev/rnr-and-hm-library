import React from 'react';
import './../styles/home.css'

const Home = () => (
    <div className='home'>
        <article className='MainArticle'>
            <header>
                <h1>Welcome to the Rock'n'Roll and Heavy Metal Library</h1>
            </header>
            <p>
                This is a place where you can make references to Rock'n'roll and Heavy metal bands, albums and substyles.
            </p>
        </article>
        <article className="subarticle">
            <header>
                <h2>Your contribution</h2>
            </header>
            <p>
                You also can constribute to the development of the library by sending requests to the admin of the Library with proposals for albums.
            </p>
        </article>
        <article className="subarticle">
            <header>
                <h2>Disclaimer</h2>
            </header>
            <p>
                All artworks, images, photos, music footages, citations, lyrics are ownership of their respective artists,bands and companies related to bands' activities.
                This library is created with educational purposes only and does not guarantee the exactness of the information published in it. 
            </p>
        </article>
        <article className="subarticle">
            <header>
                <h2>The author</h2>
            </header>
            <p>
                The author is long-years music lover who grew up with the music of Deep Purple, Led Zeppelin, Pink Floyd, Iron Maiden, Judas Priest and anything that would be classified as Hard Rock, Rock'n'Roll, Heavy Metal or just GOOD MUSIC!
            </p>
        </article>
    </div>
)

export default Home