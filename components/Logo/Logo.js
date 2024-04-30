import React from 'react';
import Image from 'next/image'
import Link from "next/link";
const logo = '/images/netflixroulette.png';
const Logo = () => {
    return (
        <Link href={'/'}>
            <Image src={logo} alt="Logo" width={150} height={18} />
        </Link>
    );
};

export default Logo;
