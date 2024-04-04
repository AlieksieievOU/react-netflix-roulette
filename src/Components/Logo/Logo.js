import React from 'react';
const logo = process.env.PUBLIC_URL + '/images/netflixroulette.png';
const Logo = () => {
    return (
        <div>
            <a href="/"><img src={logo} alt="Logo" /></a>
        </div>
    );
};

export default Logo;
