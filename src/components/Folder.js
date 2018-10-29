import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class Folder extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <Link to={`/folder/${this.props.folderId}`}>
                <div className="folder my-3 text-center vertical-center">
                    <div className="folder__name">
                        {this.props.name}
                    </div>
                </div>
            </Link>
        );
    }
}

export default withRouter(Folder);