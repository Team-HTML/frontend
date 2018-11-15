import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import OptionMenu from './OptionMenu';
import FolderOptions from './FolderOptions';

const options = ['Rename','Delete'];

class Folder extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div  className = "folder">
                <Link to={`/folder/${this.props.folderId}`}>
                    <div className="folderImage my-3 text-center vertical-center">
                        <img src = "/folder.png"/>
                    </div>
                </Link>

                <div className = "folder1">
                    <Link to={`/folder/${this.props.folderId}`}>
                        <div className="my-3 text-center vertical-center">
                            <div className="folder__name">
                                {this.props.name}
                            </div>
                        </div>
                    </Link>
                </div>
                {/*<div>
                    <Dropdown options={options} onChange={this._onSelect} placeholder="Select an option" />
                </div> 
                <OptionMenu />  */}
                <div className="folderMenu text-md-right"><FolderOptions /></div>

            </div>
        );
    }
}

export default withRouter(Folder);