'use strict';

import React from 'react';

function ApiStatusIndicator(props) {
    if (props.apiStatus && props.apiStatus.apiInProgress) {
        return (
            <div className="api-status api-status--progress">
                <i className="fa fa-github" />
            </div>
        );
    }

    if (props.apiStatus && props.apiStatus.error) {
        return (
            <div className="api-status api-status--error">
                <strong>Whoops:</strong> {props.apiStatus.error.message}
            </div>
        );
    }

    return null;
}

export default ApiStatusIndicator;
