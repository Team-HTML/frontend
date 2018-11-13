import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import OptionMenu from './OptionMenu';

const options = ['Rename','Delete'];

class Folder extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <Link to={`/folder/${this.props.folderId}`}>
                    <div className="folder my-3 text-center vertical-center">
                        <div className="folder__name">
                            {this.props.name}
                        </div>
                    </div>
                </Link>
                {/*<div>
                    <Dropdown options={options} onChange={this._onSelect} placeholder="Select an option" />
                </div>  */}
                <OptionMenu />
            </div>
        );
    }
}

export default withRouter(Folder);