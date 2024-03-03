import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import Counter from './Counter';

describe('Test Counter Component', () => {
    test('Test that component renders initial value provided in props', () => {
        const initialValue = 0;
        render(<Counter initialValue={initialValue}/>);
        const counterLabel = screen.getByText(`${initialValue}`);
        expect(counterLabel).toBeInTheDocument();
    })

    test('Test that component renders increase and decrease buttons', () => {
        const initialValue = 0;
        render(<Counter initialValue={initialValue}/>);
        const incrementButton = screen.getByText(/Increase/i);
        const decrementButton = screen.getByText(/Decrease/i);
        expect(incrementButton).toBeInTheDocument();
        expect(decrementButton).toBeInTheDocument();
    })

    test('Test that a click event on "decrement" button increments the displayed value', () => {
        const initialValue = 5;
        render(<Counter initialValue={initialValue}/>);
        const counterLabel = screen.getByText(`${initialValue}`);
        const decrementButton = screen.getByText(/Decrease/i);
        fireEvent.click(decrementButton);
        expect(counterLabel).toHaveTextContent(`${initialValue - 1}`);
    });

    test('Test that a click event on "increment" button decrements the displayed value', () => {
        const initialValue = 5;
        render(<Counter initialValue={initialValue}/>);
        const counterLabel = screen.getByText(`${initialValue}`);
        const decrementButton = screen.getByText(/Increase/i);
        fireEvent.click(decrementButton);
        expect(counterLabel).toHaveTextContent(`${initialValue + 1}`);
    });
});
