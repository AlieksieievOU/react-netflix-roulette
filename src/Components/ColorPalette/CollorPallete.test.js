import React from 'react';
import { render, screen } from '@testing-library/react';
import ColorPalette from './ColorPalette';

const colorPaletteArray = [
    {'color': 'F65261'},
    {'color': '424242'},
    {'color': '232323'},
    {'color': '555555'},
    {'color': 'FFFFFF'}
]
jest.mock('./colorPalette.module.scss', () => ({
    ColorPaletteWrapper: 'ColorPaletteWrapper',
    asideHeader: 'asideHeader',
}));

describe('ColorPalette component', () => {
    it('renders the color palette with all colors', () => {
        render(<ColorPalette />);

        expect(screen.getByRole('heading')).toHaveTextContent('Color Palette');
        expect(screen.getAllByTestId('color')).toHaveLength(5);

        const colorItems = screen.getAllByTestId('color');
        colorItems.forEach((item, index) => {
            expect(item).toHaveStyle({ backgroundColor: `#${colorPaletteArray[index].color}` });
            expect(item.nextElementSibling).toHaveTextContent(colorPaletteArray[index].color);
        });
    });
});