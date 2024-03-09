import React from 'react';
import styles from './colorPalette.module.scss';

const colorPaletteArray = [
    {'color': 'F65261'},
    {'color': '424242'},
    {'color': '232323'},
    {'color': '555555'},
    {'color': 'FFFFFF'}
]

const ColorPalette = () => {
    return (
        <div className={styles.ColorPaletteWrapper}>
            <h2 className={styles.asideHeader} >Color Palette</h2>
            <ul>
                {colorPaletteArray.map(
                    (item, index) => <li key={index}><span  data-testid="color" style={{backgroundColor:"#"+item.color}}></span> <span>{item.color}</span></li>
                )}
            </ul>
        </div>
    );
};

export default ColorPalette;