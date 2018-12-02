import React from 'react';
import Folder from '../../components/Folder';
import Popup from "reactjs-popup";
import ReactDropzone from "react-dropzone";
import Template from '../../components/Template';
import Dropdown from 'react-dropdown';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import 'react-dropdown/style.css';

import Rodal from "rodal";

import 'rodal/lib/rodal.css';
import {getFolderById, appendFolder, createFolder} from "../../data/Api";

const options = ['Alphabetical', 'Last Modified', 'Creation Date' ];

const defaultOption = options[0];

class DesktopPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            folders: [],
            uploadedFile: null,
            addFolder: '',
            open: false,
            dropdownOpen: false,
            createVisible: false,
            uploadVisible: false,
        }

        this.uploadTemplate = this.uploadTemplate.bind(this);
        this.updateAddFolder = this.updateAddFolder.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.toggle = this.toggle.bind(this);
    }

    openModal (){
        this.setState({ open: true })
    }
    closeModal () {
        this.setState({ open: false })
    }

    showCreate() {
        this.setState({ createVisible: true });
    }
 
    hideCreate() {
        this.setState({ createVisible: false });
    }

    showUpload() {
        this.setState({ uploadVisible: true });
    }
 
    hideUpload() {
        this.setState({ uploadVisible: false });
    }

    componentDidMount() {
        this.setState(this.props.user)
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

    renderAddFolder() {
      const {newFolder} = this.state;

      return (
        <div className="row">
              <div className="col-md-3">
                  <div className="box box__add my-3 text-center vertical-center"
                  onClick={this.openModal}>
                    +
                  </div>
              </div>
        </div>
      );
    }

    renderDefaultFolder() {

        const {default_folder} = this.state;

        if (default_folder && default_folder.templates) {
            default_folder.templates.map(t => {
                return (
                    <div className="defaultFolderRow row">
                        <div className="col-md-3">
                            <Template {...t} />
                        </div>
                    </div>
                );
            })
        }
    }

    renderUploadTemplate() {
        return (
            /*<Popup
                trigger={<button className="btn btn-outline-primary border-0 btn-block">Upload Template</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex justify-content-center m-2 h4"> Choose a template to upload: </div>
                <div className="d-flex justify-content-center">
                    <ReactDropzone
                        className="d-flex container justify-content-center"
                        onDrop={this.onDrop}
                        >
                        <div className="border rounded p-4">
                            Pick a file here
                        </div>
                    </ReactDropzone>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="btn btn-outline-dark m-2" onClick={this.uploadTemplate}>Submit</div>
                </div>
            </Popup>*/
            <div>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.showUpload.bind(this)}>
                    Upload Template
                </button>
 
                <Rodal 
                    visible={this.state.uploadVisible} 
                    onClose={this.hideUpload.bind(this)} 
                    animation="door"
                    width="600"
                    height="200"
                >
                    <div className="d-flex justify-content-center m-2 h4"> Choose a template to upload: </div>
                    <div className="d-flex justify-content-center">
                        <ReactDropzone
                            className="d-flex container justify-content-center"
                            onDrop={this.onDrop}
                            >
                            <div className="border rounded p-4">
                                Pick a file here
                            </div>
                        </ReactDropzone>
                    </div>
                        <div className="d-flex justify-content-center">
                        <div className="btn btn-outline-dark m-2" onClick={this.uploadTemplate}>Submit</div>
                    </div>
                </Rodal>
            </div>
        )
    }

    renderCreateFolder() {
        return(
            /*<Popup
                trigger={<button className="btn btn-outline-primary border-0 btn-block">Create Folder</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h4> Please enter name of folder below: </h4>
                </div>
                <div className="d-flex container justify-content-center">
                    <input type="text" value={this.state.addFolder} className="form-control"
                    onChange={(evt) => this.updateAddFolder(evt)} />
                </div>
                <div className="d-flex container justify-content-center m-2">
                    <button class="btn-outline-dark rounded" onClick={this.createFolder}> Create </button>
                </div>
            </Popup>*/
            <div>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.showCreate.bind(this)}>
                    Create Folder
                </button>

                <Rodal 
                    visible={this.state.createVisible} 
                    onClose={this.hideCreate.bind(this)} 
                    animation="door"
                    width="600"
                    height="140"
                >
                    <div className="d-flex container justify-content-center">
                        <h4> Please enter name of folder below: </h4>
                    </div>
                    <div className="d-flex container justify-content-center">
                        <input type="text" value={this.state.addFolder} className="form-control"
                        onChange={(evt) => this.updateAddFolder(evt)} />
                    </div>
                    <div className="d-flex container justify-content-center m-2">
                        <button class="btn-outline-dark rounded" onClick={this.createFolder}> Create </button>
                    </div>
                </Rodal>
            </div>
        )
    }

    renderAddButton() {
        return (
            /*<ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <div className = "btn rounded-circle">
            <DropdownToggle>
                <div className = "home__upload__font"> 
                    + 
                </div>
            </DropdownToggle>
            </div>
            <DropdownMenu>
                <div>{this.renderCreateFolder()}</div>
                <div>{this.renderUploadTemplate()}</div>
            </DropdownMenu>
        </ButtonDropdown>*/
            <div className="row mt-5">
            <Popup 
                trigger={<button className="btn rounded-circle btn-primary home__upload"><span style={{transform: 'translateY(-2.5rem)'}}>+</span></button>} 
                on="click"
                position="left center">
                <div>
                    <div className="d-flex justify-content-center p-1">{this.renderCreateFolder()}</div>
                    <div className="d-flex justify-content-center p-1">{this.renderUploadTemplate()}</div>
                </div>
            </Popup>
            </div>

        )
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    onDrop(a) {
        console.log(a)
        this.setState({uploadedFile: a[0]});
    }

    uploadTemplate() {
        const {uploadedFile, default_folder} = this.state;

        this.setState({defaultFolder: [...default_folder, {name: uploadedFile.name}]})
    }

    updateAddFolder(evt) {
      this.setState({
        addFolder: evt.target.value
      });
    }

    createFolder() {
        const {addFolder, folders} = this.state;

        createFolder(addFolder, this.props.user.user_id)
            .then((res) => {
                appendFolder(this.props.user.user_id, {newfolder: res.folder_id})
                    .then((res2) => {
                        console.log(res2);
                        this.setState({
                            addFolder: '',
                            folders: [...folders, {folder_name: addFolder, folder_id: res.folder_id}]
                        })      
                    })
            })

        this.closeModal();
        return(
          <p> {this.renderFolders()} </p>
        );
    }

    uploadTemplate() {
        const {uploadedFile, templates} = this.state;
        console.log("hAHAAAAA", uploadedFile);
        this.setState({templates: [...templates, {name: uploadedFile.name, templateId: 5}]})
    }

    render() {
        return (
            <div className="home mt-5">
                <div className="container">
                    <div className="row mx-0">
                        <h1>Home</h1>
                        <div className="w-20 ml-auto">Sort By:
                            <Dropdown arrowClassName='myArrowClassName' options={options} onChange={this._onSelect} value={defaultOption}></Dropdown>
                        </div>
                    </div>
                    {this.renderFolders()}
                    {/*
                    {this.renderAddFolder()}
                    */}
                    <div className="home__divider"></div>
                    {this.renderDefaultFolder()}
                    {this.renderAddButton()}
                </div>
            </div>
        )
    }
}

export default DesktopPage;
