'use strict';

const _callbacks = [];

function BaseDispatcher() {} // eslint-disable-line no-empty-function

BaseDispatcher.prototype = Object.assign({}, BaseDispatcher.prototype, {

    /**
    * Register a Store's callback so that it may be invoked by an action.
    *
    * @param {Function} callback The callback to be registered.
    * @return {Number} The index of the callback within the _callbacks array.
    */
    register: (callback) => {
        _callbacks.push(callback);

        return _callbacks.length - 1; // index
    },

    /**
    * @param  {Object} payload The data from the action.
    * @return {void} [description]
    */
    dispatch: (payload) => {
        // First create array of promises for callbacks to reference.
        const resolves = [];
        const rejects  = [];

        _callbacks.map((cb, i) => {
            return new Promise((resolve, reject) => {
                resolves[i] = resolve;
                rejects[i] = reject;
            });
        });

        // Dispatch to callbacks and resolve/reject promises.
        _callbacks.forEach((callback, i) => {
            // Callback can return an obj, to resolve, or a promise, to chain.
            // See waitFor() for why this might be useful.
            Promise.resolve(callback(payload))
                .then(() => {
                    resolves[i](payload);
                }, (err) => {
                    rejects[i](new Error('BaseDispatcher callback unsuccessful', err));
                });
        });
    }
});

export default BaseDispatcher;
