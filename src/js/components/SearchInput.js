'use strict';

import React from 'react';

function SearchInput(props) {
    return (
        <div className="input-container">
            <form onSubmit={props.onFormSubmit}>
                <input
                    type="text"
                    placeholder="Enter the username of github user"
                    className="search-input"
                    onChange={props.onSearchQueryChange}
                    value={props.searchQuery}
                />
            </form>
        </div>
    );
}

export default SearchInput;
