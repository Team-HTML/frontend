import React from 'react';
import {Link} from 'react-router-dom';

class Folder extends React.Component {

    render() {
        return (
            <Link to="/folder/1">
                <div className="folder my-3 text-center vertical-center">
                    <div className="folder__name">
                        {this.props.name}
                    </div>
                </div>
            </Link>
        );
    }
}

export default Folder;