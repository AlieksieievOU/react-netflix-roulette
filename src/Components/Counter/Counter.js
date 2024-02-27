import React from 'react';
const title = 'Counter';
const action = {
    Increase : 'increase',
    Decrease : 'decrease'
};
const labels = {
    Increase : 'Increase',
    Decrease : 'Decrease'
};

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: props.initialValue || 0
        }
    }

    operateCounter(action) {
        this.setState((prevState) => ({ counter: action === action.Increase ? prevState.counter + 1 : prevState.counter - 1 }));
    }

    render() {
        return React.createElement(
            'div',
            { className: 'counterContainer' },
            React.createElement(
                'h2',
                     { className: 'counterTitle' },
                title,
            ),
            React.createElement(
                'div',
                    { className: 'counterBody' },

                React.createElement(
                    'p',
                    { className: 'counterLabel' },
                    this.state.counter
                ),
                React.createElement(
                    'button',
                    {
                      className: 'increaseButton',
                      onClick: () => this.operateCounter(action.Increase)
                    },
                    labels.Increase
                ),
                React.createElement(
                    'button',
                    {
                      className: 'decreaseButton',
                      onClick: () => this.operateCounter(action.Decrease)
                    },
                    labels.Decrease
                )
            ),
        )
    }
}

 export default Counter;