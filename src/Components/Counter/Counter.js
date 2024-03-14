import React from 'react';
import styles from './Counter.module.scss';

const buttonAction = {
    Increase: 'increase',
    Decrease: 'decrease'
};
const labels = {
    Increase: 'Increase',
    Decrease: 'Decrease'
};

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: props.initialValue || 0
        }
    }

    operateCounter(action) {
        this.setState((prevState) => ({counter: action === buttonAction.Increase ? prevState.counter + 1 : prevState.counter - 1}));
    }

    render() {
        return React.createElement(
            'div',
            {className: styles.counterContainer},
            React.createElement(
                'div',
                {className: 'counterBody'},

                React.createElement(
                    'p',
                    {className: 'counterLabel'},
                    this.state.counter
                ),
                React.createElement(
                    'button',
                    {
                        className: 'increaseButton',
                        onClick: () => this.operateCounter(buttonAction.Increase)
                    },
                    labels.Increase
                ),
                React.createElement(
                    'button',
                    {
                        className: 'decreaseButton',
                        onClick: () => this.operateCounter(buttonAction.Decrease)
                    },
                    labels.Decrease
                )
            )
        )
    }
}

export default Counter;