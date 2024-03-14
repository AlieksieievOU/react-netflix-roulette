import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from './Logo';
const logo = process.env.PUBLIC_URL + '/images/netflixroulette.png';

describe('Logo component', () => {
    it('renders the logo image and alt text', () => {
        render(<Logo />);

        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();

        expect(image).toHaveAttribute('src', logo);
        expect(image).toHaveAttribute('alt', 'Logo');

    });
});
