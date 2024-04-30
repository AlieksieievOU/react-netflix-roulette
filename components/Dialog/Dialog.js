'use client'
import React from 'react';
import {createPortal} from 'react-dom';
import styles from './Dialog.module.scss';
import FocusLock from 'react-focus-lock';

const Dialog = ({showModal, onClose, children}) => {

    return (
        <>
            {showModal && createPortal(
                <>
                    <div className={styles.overlay}></div>
                    <div className={styles.modalWrapper}>
                        <div className={styles.modalWrapperParent}>
                            <FocusLock>
                                {children}
                            </FocusLock>
                        </div>
                        <button data-testid="close-dialog" className={styles.menuButtonClose} onClick={onClose}></button>
                    </div>
                </>
                , document.getElementById('js-app')
            )}
        </>
    );
};

export default Dialog;
