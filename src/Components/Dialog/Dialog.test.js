import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from './Dialog';
import App from "../../App";
import {wait} from "@testing-library/user-event/dist/utils";

describe('Dialog component', () => {
    it('does not render the dialog when showModal is false', () => {
        render(<App/>);
        render(<Dialog showModal={false} onClose={jest.fn()} children={<p>Dialog Content</p>} />);
        expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
    });

    it('renders the dialog and content when showModal is true', () => {
        render(<App/>);
        render(<Dialog showModal={true} onClose={jest.fn()} children={<p>Dialog Content</p>} />);
        expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    });
});
