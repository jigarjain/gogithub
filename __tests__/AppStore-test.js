jest.mock('../src/js/dispatchers/AppDispatcher');

describe('AppStore', function() {
    var ActionConstants = require('../src/js/ActionConstants');
    var AppDispatcher;
    var AppStore;
    var callback;

    beforeEach(function() {
        AppDispatcher = require('../src/js/dispatchers/AppDispatcher');
        AppStore = require('../src/js/stores/AppStore');

        callback = AppDispatcher.register.mock.calls[0][0];
    });


    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });


    it('should correctly initialize the state', function () {
        var appState = AppStore.getState();
        expect(appState).toEqual({
            userExists: false,
            userRepos: [],
            apiStatus: {
                apiInProgress: false,
                error: null
            }
        });
    });


    it('fetches repos of a existing user who has repos', function () {
        var actionFetchRepos = {
            actionType: ActionConstants.GET_REPOS_OF_USER,
            data: {
                username: 'jigarjain'
            }
        };

        return callback(actionFetchRepos)
            .then(function () {
                var appState = AppStore.getState();
                expect(appState.userExists).toEqual(true);
                expect(appState.userRepos.length).toBeGreaterThanOrEqual(20);
                expect(appState.apiStatus.apiInProgress).toEqual(false);
                expect(appState.apiStatus.error).toEqual(null);
            });
    });


    it('fetches 0 repos of a existing user who has no repos', function () {
        var actionFetchRepos = {
            actionType: ActionConstants.GET_REPOS_OF_USER,
            data: {
                username: 'some'
            }
        };

        return callback(actionFetchRepos)
            .then(function () {
                var appState = AppStore.getState();
                expect(appState.userExists).toEqual(true);
                expect(appState.userRepos.length).toEqual(0);
                expect(appState.apiStatus.apiInProgress).toEqual(false);
                expect(appState.apiStatus.error).toEqual(null);
            });
    });


    it('handles the case where user does not exist', function () {
        var actionFetchRepos = {
            actionType: ActionConstants.GET_REPOS_OF_USER,
            data: {
                username: 'jigar45968q9'
            }
        };

        return callback(actionFetchRepos)
            .then(function () {
                var appState = AppStore.getState();
                expect(appState.userExists).toEqual(false);
                expect(appState.userRepos.length).toEqual(0);
                expect(appState.apiStatus.apiInProgress).toEqual(false);
                expect(appState.apiStatus.error.message).toEqual('User does not exist on Github');
            });
    });
});