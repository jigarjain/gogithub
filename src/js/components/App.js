'use strict';

import React, { Component } from 'react';
import {AppActions} from '../actions';
import {AppStore} from '../stores';
import {Header, Footer} from './common';
import SearchInput from './SearchInput';
import RepoList from './RepoList';
import ApiStatusIndicator from './ApiStatusIndicator';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...AppStore.getState(),
            searchQuery: ''
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
        this.onAppStoreChange = this.onAppStoreChange.bind(this);
    }


    componentDidMount() {
        AppStore.addChangeListener(this.onAppStoreChange);
    }


    componentWillUnmount() {
        AppStore.removeChangeListener(this.onAppStoreChange);
    }


    onAppStoreChange() {
        this.setState({
            ...AppStore.getState()
        });
    }


    onFormSubmit(e) {
        e.preventDefault();
        AppActions.getReposOfUser(this.state.searchQuery);
    }


    onSearchQueryChange(e) {
        this.setState({
            searchQuery: e.currentTarget.value.trim()
        });
    }


    render() {
        return (
            <div className="container">
                <Header />
                    <div className="page">
                        <SearchInput
                            searchQuery={this.state.searchQuery}
                            onFormSubmit={this.onFormSubmit}
                            onSearchQueryChange={this.onSearchQueryChange}
                        />
                        <ApiStatusIndicator apiStatus={this.state.apiStatus} />
                        <RepoList repos={this.state.userRepos} userExists={this.state.userExists} />
                    </div>
                <Footer />
            </div>
        );
    }
}
