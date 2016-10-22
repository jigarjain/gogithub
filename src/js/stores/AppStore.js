'use strict';

import {EventEmitter} from 'events';
import {AppApi} from '../apis';
import ActionConstants from '../ActionConstants';
import {AppDispatcher} from '../dispatchers';

const CHANGE = 'CHANGE';

const appState = {
    userExists: false,
    userRepos: [],
    apiStatus: {
        apiInProgress: false,
        error: null
    }
};


function _setApiStatus(apiInProgress, error) {
    appState.apiStatus = {
        apiInProgress,
        error
    };
}


function _setUserRepos(repos) {
    appState.userExists = true;
    appState.userRepos = repos;
}


function _clearRepos() {
    appState.userExists = false;
    appState.userRepos = [];
}


const AppStore = Object.assign({}, EventEmitter.prototype, {
    getState: function () {
        return {
            userExists: appState.userExists,
            userRepos: [].concat(appState.userRepos),
            apiStatus: Object.assign({}, appState.apiStatus)
        };
    },


    addChangeListener: function (callback) {
        this.on(CHANGE, callback);
    },


    removeChangeListener: function (callback) {
        this.removeListener(CHANGE, callback);
    },


    emitChange: function () {
        this.emit(CHANGE);
    },


    dispatcherIndex: AppDispatcher.register((payload) => {
        switch (payload.actionType) {
            case ActionConstants.GET_REPOS_OF_USER:
                return Promise.resolve()
                    .then(() => {
                        _clearRepos();
                        _setApiStatus(true, null);
                        AppStore.emitChange();
                    })
                    .then(() => {
                        return AppApi.getReposOfUser(payload.data.username);
                    })
                    .then((data) => {
                        // Handle 404 error: User not found
                        if (data.err && data.err.status === 404) {
                            _setApiStatus(false, new Error('User does not exist on Github'));
                            AppStore.emitChange();

                            return;
                        }

                        // Handle other generic API errors (API not reachable)
                        if (data.err) {
                            _setApiStatus(false, new Error('There was a API failure. Please try again later'));
                            AppStore.emitChange();

                            return;
                        }

                        // Handle success case: User found & API sucess
                        if (data.res.statusCode === 200) {
                            _setUserRepos(data.res.body);
                            _setApiStatus(false, null);
                            AppStore.emitChange();

                            return;
                        }
                    })
                    .catch((err) => {
                        _setApiStatus(false, err);
                        AppStore.emitChange();
                    });

            default:
                return true;
        }
    })
});

export default AppStore;
module.exports = AppStore;
