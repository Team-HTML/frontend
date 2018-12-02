import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import 'react-dropdown/style.css';
import FolderOptions from './FolderOptions';
import ReactS3Uploader from 'react-s3-uploader';
const options = ['Rename','Delete'];

class Folder extends React.Component {

    render() {
        return (
            <div className = "shadow folder border-0">
                <div className="folderImage my-3 text-center vertical-center">
                    <img src = "/folder.png"/>
                </div>

                <div className = "folder1">
                    <Link to={`/folder/${this.props.folder_id}`}>
                        <div className="my-3 text-center vertical-center">
                            <div className="folder__name">
                                {this.props.folder_name}
                            </div>
                        </div>
                    </Link>
                </div>
                {/*<div>
                    <Dropdown options={options} onChange={this._onSelect} placeholder="Select an option" />
                </div> 
                <OptionMenu />  */}
                <div className="folderMenu text-md-right"><FolderOptions {...this.props} /></div>

            </div>
        );
    }
}

export default withRouter(Folder);