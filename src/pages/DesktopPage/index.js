import React from 'react';
import Folder from '../../components/Folder';
import Popup from "reactjs-popup";
import ReactDropzone from "react-dropzone";
import Template from '../../components/Template';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = ['Alphabetical', 'Last Modified', 'Creation Date' ];

const defaultOption = options[0];

class DesktopPage extends React.Component {

 
    constructor(props) {
        super(props);
        this.state = {
            folders: [
                {
                    name: 'Folder 1',
                    folderId: 1
                },
                {
                    name: 'Folder 2',
                    folderId: 2
                },
                {
                    name: 'Folder 3', 
                    folderId: 3
                },
                {
                    name: 'Folder 4',
                    folderId: 4
                },
                {
                    name: '+',
                    folderId: -1
                }
            ],
            defaultFolder: [

            ],
            uploadedFile: null
        }

        this.uploadTemplate = this.uploadTemplate.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    renderFolders() {
        const {folders} = this.state;

        return (
            <div className="row">
                {folders.map(d => {
                    return (
                        <div className="col-md-3">
                            <Folder {...d} />
                        </div>
                    );
                })} 
            </div>
        );
    }

    renderDefaultFolder() {

        const {defaultFolder} = this.state;

        return (
            <div className="row">
                {defaultFolder.map(d => {
                    console.log(d);
                    return (
                        <div className="col-md-3">
                            <Template {...d} />
                        </div>
                    );
                })} 
            </div>
        );
    }

    onDrop(a) {
        console.log(a)
        this.setState({uploadedFile: a[0]});
    }

    uploadTemplate() {
        const {uploadedFile, defaultFolder} = this.state;

        this.setState({defaultFolder: [...defaultFolder, {name: uploadedFile.name}]})
    }

    render() {
        return (
            <div className="home mt-5">
                <div className="container">
                    <div className="row mx-0">
                        <h1>Library</h1>
                        <Popup
                            trigger={<button className="btn rounded-circle btn-primary home__upload"><span style={{transform: 'translateY(-2.5rem)'}}>+</span></button>}
                            modal
                            closeOnDocumentClick
                            >
                            <p> Choose a template to upload: </p>
                            <ReactDropzone
                                className="d-flex container justify-content-center"
                                onDrop={this.onDrop}
                                >
                                <div className="border">
                                    Pick a file here 
                                </div>
                            </ReactDropzone>
                            <div className="ml-5">
                                <div className="btn btn-primary" onClick={this.uploadTemplate}>Submit</div>
                            </div>
                        </Popup>
                        <div className="ml-auto home__sort mt-1">
                            <span> Sort By:
                                <Dropdown arrowClassName='myArrowClassName' options={options} onChange={this._onSelect} value={defaultOption}></Dropdown>
                            </span>
                        </div>
                    </div>
                    {this.renderFolders()}
                    {this.renderDefaultFolder()}
                </div>
            </div>
        )
    }
}

export default DesktopPage;
