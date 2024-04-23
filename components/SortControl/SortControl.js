"use client"
import React from 'react';
import { useState } from 'react';
import styles from './SortControl.module.scss';

const labelTitle = 'Sort by'

const SortControl = (props) => {
    const [selected, setSelected] = useState(parseInt(props.defaultSelectedSortControl));
    const sortList = props.SortControl;
    function handleChange (e) {
        if (e.target.value !== selected) {
            setSelected(e.target.value);
            props.onSortControl(e.target.value)
        }
    }

    return (
        <div className={styles.SortControlWrapper}>
            <label  data-testid="SortControlSelectLabel" htmlFor="SortControlSelect">{labelTitle}</label>
            <select className={styles.select} data-testid="sortControl" name="sortBy" id="sortControl" value={selected} onChange={(e) => handleChange(e)}>
                {sortList.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
            </select>
            <div data-testid="triangle" className={styles.triangle}></div>
        </div>
    );
};

export default SortControl;
