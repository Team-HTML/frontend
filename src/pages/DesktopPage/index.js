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
import {getFolderById, appendFolder, createFolder, uploadImgToS3, getJSONFromImg, generateHTML, createTemplate, addTemplateToFolder} from "../../data/Api";

const options = ['Alphabetical', 'Creation Date' ];

const defaultOption = options[0];

class DesktopPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            folders: [],
            uploadedFile: null,
            uploadedFileName: null,
            addFolder: '',
            open: false,
            dropdownOpen: false,
            createVisible: false,
            uploadVisible: false,
            sortFn: undefined,
        }

        this.uploadTemplate = this.uploadTemplate.bind(this);
        this.updateAddFolder = this.updateAddFolder.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.toggle = this.toggle.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.deleteFolderById = this.deleteFolderById.bind(this);
        this.renameFolderById = this.renameFolderById.bind(this);
        this._onSelect = this._onSelect.bind(this);
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

    deleteFolderById(id) {
        this.setState({folders: this.state.folders.filter(d => d.folder_id !== id)})
    }

    _onSelect(e) {
        const sortFns = {
            'Alphabetical': (a,b) => a.folder_name.localeCompare(b.folder_name),
            'Creation Date': (a,b) => b.creation_date.localeCompare(a.creation_date),
        }
        this.setState({sortFn: sortFns[e.label]})
    }

    onChangeName(e) {
        this.setState({uploadedFileName: e.target.value})
    }

    onClickCreate(e) {
        this.createFolder();
        this.hideCreate();
    }

    onClickUpload(e) {
        this.uploadTemplate();
        this.hideUpload();
    }

    renameFolderById(id, newName) {
        console.log(id, newName)
        const otherFolders = this.state.folders.filter(d => d.folder_id !== id)
        const curr = this.state.folders.filter(d => d.folder_id === id)[0]
        this.setState({folders: [...otherFolders, {...curr, folder_name: newName}]})
    }

    renderFolders() {
        const {folders, sortFn} = this.state;
        if (sortFn == undefined) {
            this._onSelect({value: "Alphabetical", label: "Alphabetical"})
        }
        const sortedFolders = folders.sort(sortFn)
        return (
            <div className="row">
                {sortedFolders.map(d => {
                    return (
                        <div className="col-md-3">
                            <Folder {...d} user={this.props.user} deleteFolderById={this.deleteFolderById} renameFolderById={this.renameFolderById}/>
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
            console.log(default_folder)
            return (
                <div className="defaultFolderRow' row">
                    {default_folder.templates.map(t => {
                        return (
                                <div className="col-md-3">
                                    <Template {...t} user={this.props.user} />
                                </div>
                    );
                })}
                </div>)
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
                    height="275"
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
                    <div className="d-flex justify-content-center my-2 w-50 mx-auto">
                        <label>Template Name: </label>
                        <input className="form-control" onChange={this.onChangeName} />
                    </div>
                    <div className="d-flex w-100 m-2r">
                        <div className="btn btn-outline-primary m-2 ml-auto" onClick={this.onClickUpload.bind(this)/*this.uploadTemplate*/}>Submit</div>
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
                    <div className="d-flex container justify-content-left">
                        <h4> Please enter name of folder below: </h4>
                    </div>
                    <div className="d-flex container justify-content-center">
                        <input type="text" value={this.state.addFolder} className="form-control"
                        onChange={(evt) => this.updateAddFolder(evt)} />
                    </div>
                    <div className="d-flex w-100 m-2">
                        <button class="btn-outline-primary rounded ml-auto" onClick={this.onClickCreate.bind(this)/*this.createFolder*/}> Create </button>
                    </div>
                </Rodal>
            </div>
        )
    }

    renderAddButton() {
        return (
            <Popup 
                trigger={<button className="btn rounded-circle btn-primary home__upload shadow-lg"><span style={{transform: 'translateY(-2.5rem)'}}>+</span></button>} 
                on="click"
                position="left center">
                <div className="">
                    <div className="d-flex justify-content-center p-1">{this.renderCreateFolder()}</div>
                    <div className="d-flex justify-content-center p-1">{this.renderUploadTemplate()}</div>
                </div>
            </Popup>
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
        const {uploadedFile, uploadedFileName} = this.state;
        const {templates} = this.state.default_folder;
        const epoch = Math.round((new Date()).getTime() / 1000);
        uploadImgToS3(uploadedFile, epoch)
            .then((res) => {
                const {url} = res.req;
                return {url, e: epoch + "." + uploadedFile.type.split('/')[1]};
            })
            .then(({url, e}) => {
                const tempData = {
                    "created_by": 1213123,
                    "is_public": false,
                    "template_name": uploadedFileName,
                    "template_photo_url": url,
                    "template_css": ".fuck {}",
                }
                this.setState({
                    default_folder: {...this.state.default_folder, 
                        templates: [...templates, tempData]
                    }
                });

                return getJSONFromImg(e)
                    .then(generateHTML)
                    .then(({html_key}) => {
                        const s3Url = "http://cse110.html.html.s3.amazonaws.com/";
                        return {
                            "created_by": this.props.user.user_id,
                            "is_public": false,
                            "template_name": uploadedFileName,
                            "template_photo_url": url,
                            "template_css": ".fuck {}",
                            "template_html": s3Url + html_key,
                        }
                    })
                    .then((data) => {
                        console.log("HERE")
                        return createTemplate(data, this.props.user.user_id)
                            .then((res) => {
                                console.log("Here 2")
                                return addTemplateToFolder(this.props.user.user_id, this.state.default_folder.folder_id, res.template_id)
                                    .then((res2) => {
                                        console.log("here 3")
                                        let temps = this.state.default_folder.templates;
                                        const targetIdx = temps.findIndex(e => e.template_name === uploadedFileName);
                                        temps[targetIdx] = {...data, template_id: res.template_id}
                                        this.setState({
                                            default_folder: {...this.state.default_folder, 
                                                templates: temps
                                            }
                                        });
                                    })
                            })
                            .catch(e => {

                            })
                    })
                    .catch((e) => {
                        this.setState({default_folder: {
                            ...this.state.default_folder,
                            templates: this.state.default_folder.templates.filter(x => x.template_name !== uploadedFileName)
                        }})
                    }) 
                
            })
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
    render() {
        return (
            <>
                <div className="home pt-5">
                    <div className="container">
                        <div className="row mx-0">
                        
                            <h1 className="home__name">Home</h1>
                            <div className="w-20 ml-auto home__name">Sort By:
                                <Dropdown arrowClassName='myArrowClassName' options={options} onChange={this._onSelect} value={defaultOption}></Dropdown>
                            </div>
                        </div>
                        {this.renderFolders()}
                        {/*
                        {this.renderAddFolder()}
                        */}
                        <div className="home__divider"></div>
                        {this.renderDefaultFolder()}
                    </div>
                </div>
                {this.renderAddButton()}
            </>
        )
    }
}

export default DesktopPage;
