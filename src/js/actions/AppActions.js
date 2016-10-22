'use strict';

import {AppDispatcher} from '../dispatchers';
import ActionConstants from '../ActionConstants';

const AppActions = {
    getReposOfUser: (username) => {
        AppDispatcher.handleDispatch({
            actionType: ActionConstants.GET_REPOS_OF_USER,
            data: {
                username
            }
        });
    }
};

export default AppActions;
