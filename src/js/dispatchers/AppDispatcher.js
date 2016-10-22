'use strict';

import BaseDispatcher from './BaseDispatcher';


const AppDispatcher = Object.assign({}, BaseDispatcher.prototype, {
    handleDispatch: function (action) {
        this.dispatch(action);
    }
});

export default AppDispatcher;
module.exports = AppDispatcher;
