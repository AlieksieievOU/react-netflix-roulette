import React from 'react';
import Image from 'next/image'
const logo = '/images/netflixroulette.png';
const Logo = () => {
    return (
        <div>
            <a href="/">
                <Image src={logo} alt="Logo" width={150} height={18} />
            </a>
        </div>
    );
};

export default Logo;
