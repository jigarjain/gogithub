'use strict';

import React from 'react';

function RepoList(props) {
    if (props.repos && props.repos.length) {
        return (
            <div className="repos-container">
                <div className="repos-count">{props.repos.length} repositories found</div>
                <div className="repo-list">
                    {
                        props.repos.map((r, i) => {
                            return (
                                <div key={i} className="repo-list__item">
                                    <h3 className="repo-name">{r.name}</h3>
                                    <a className="repo-link" href={r.html_url} target="_blank"><i className="fa fa-link" /></a>
                                    <p className="repo-desc">{r.description}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    if (props.userExists && props.repos && !props.repos.length) {
        return (
            <div className="repos-container repos-container--empty">
                User has not created any repositories
            </div>
        );
    }

    return null;
}

export default RepoList;
