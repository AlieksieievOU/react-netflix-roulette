import React from 'react';
const title = 'Search Form';
const inputPlaceholder = 'What do you want to watch';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: props.searchQuery
        };
    }

    handleInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleButtonClicked = (event) => {
        event.preventDefault();
        this.props.onSearch(this.state.searchQuery);
    };

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.props.onSearch(this.state.searchQuery);
        }
    };

    handleOnFocus = (event) => {
        this.handleButtonClicked(event);
    };

    render() {
        return (
            <div className='searchFormContainer'>
                 <h2>{title}</h2>
                <form onSubmit={this.handleButtonClicked}>
                    <input placeholder={inputPlaceholder}
                           role="searchbox"
                     type="text" 
                     onFocus={this.handleOnFocus} 
                     onKeyDown={this.handleKeyDown} 
                     value={this.state.searchQuery} 
                     onChange={this.handleInputChange} />         
                    <button type="submit" value="Submit" >Search</button>
                </form>
            </div>
        );
    }
}

export default SearchForm;