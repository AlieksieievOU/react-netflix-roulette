import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from "./Header";

describe('Header component', () => {
    it('renders all its child components and passes props to SearchForm', () => {
        render(<Header />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
    });
});

