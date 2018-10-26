import React from 'react';
import HomePage from '../HomePage';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class FolderPage extends React.Component {

    render() {
        return (
            <div className="container px-0">
                This is a folder with folderId {this.props.match.params.folderId}
            </div>
        )
    }
}

export default withRouter(FolderPage);