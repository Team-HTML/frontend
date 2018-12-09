import React from 'react';
import {withRouter} from 'react-router-dom';
import {getFolderById} from '../../data/Api';
import Template from '../../components/Template';
import Popup from "reactjs-popup";
import ReactDropzone from "react-dropzone";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Loading from 'react-loading';
import {uploadImgToS3, getJSONFromImg, generateHTML, createTemplate, addTemplateToFolder} from '../../data/Api';
import Rodal from 'rodal';

import 'rodal/lib/rodal.css';

const options = ['Alphabetical', 'Creation Date'];

const defaultOption = options[0];

class FolderPage extends React.Component {

    constructor(props) {
        super(props);
        /*
{
                folder_name: 'CSE 110 App',
                templates: [
                    {
                        template_name: 'Home Page',
                        template_id: '123',
                        template_html: '<div> i hate myself! </div>',
                    }
                ]
            }
        */
        this.state = {
            folder: null,
            error: null,
            uploadedFile: null,
            uploadedFileName: null,
            open: false,
            uploadVisible: false,
            sortFn: undefined,
        }

        this.uploadTemplate = this.uploadTemplate.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this._onSelect = this._onSelect.bind(this);
        this.renameTemplateById = this.renameTemplateById.bind(this);
        this.deleteTemplateById = this.deleteTemplateById.bind(this);
        this.setPublicTemplateById = this.setPublicTemplateById.bind(this);
    }

    showUpload() {
        this.setState({ uploadVisible: true });
    }

    hideUpload() {
        this.setState({ uploadVisible: false, uploadedFile: null, uploadedFileName: null }, function () {
                  console.log("hide");
        });
    }

    onDrop(a) {
        this.setState({uploadedFile: a[0]});
    }

    onCancel() {
        this.setState({uploadedFile: null, uploadedFileName: null});
    }

    componentDidMount() {
        //get folder data from server from the route param
        //this.props.match.params.folderId
        getFolderById(this.props.match.params.folderId, this.props.user.user_id)
            .then((res) => {
                this.setState({folder: res})
            })

    }

    _onSelect(e) {
        const sortFns = {
            'Alphabetical': (a,b) => a.template_name.localeCompare(b.template_name),
            'Creation Date': (a,b) => b.creation_date.localeCompare(a.creation_date),
        }
        this.setState({sortFn: sortFns[e.label]})
    }

    renameTemplateById(templateId, newName) {
        const others = this.state.folder.templates.filter(x => x.template_id !== templateId)
        const curr = this.state.folder.templates.filter(x => x.template_id === templateId)[0]
        console.log(others, curr)
        curr.template_name = newName

        this.setState({folder: {
            ...this.state.folder,
            templates: [...others, curr]
        }})
    }

    deleteTemplateById(templateId) {
        this.setState({
            folder: {
                ...this.state.folder,
                templates: this.state.folder.templates.filter(x => x.template_id !== templateId)
            }

        })
    }

    setPublicTemplateById(templateId, toPublic) {
        const others = this.state.default_folder.templates.filter(x => x.template_id !== templateId)
        const curr = this.state.default_folder.templates.filter(x => x.template_id === templateId)[0]
        curr.is_public = toPublic

        this.setState({default_folder: {
            ...this.state.default_folder,
            templates: [...others, curr]
        }})
    }

    setPublic() {

    }

    renderTemplates() {
        const {templates} = this.state.folder;
        let {sortFn} = this.state;
        let sortedTemplates = null;
        console.log('calling rendertemplates')
        if (templates == null)
        {
            sortedTemplates = templates;
        } else {
            if (sortFn == undefined) {
                this._onSelect({value: "Alphabetical", label: "Alphabetical"})
            }
            sortFn = this.state.sortFn
            sortedTemplates = templates.sort(sortFn);
        }
        return (
            <div className="row mt-5">
                {sortedTemplates.map(d => {
                    return (
                        <div className="col-md-3">
                            <Template
                                {...d}
                                user={this.props.user}
                                renameTemplateById={this.renameTemplateById}
                                deleteTemplateById={this.deleteTemplateById}
                                setPublicTemplateById={this.setPublicTemplateById}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    onChangeName(e) {
        this.setState({uploadedFileName: e.target.value})
    }

    onClickUpload(e) {
        if(this.state.uploadedFileName == null || this.state.uploadedFileName == '') {
          this.setState({uploadedFileName: "Untitled"}, function() {
            this.uploadTemplate();
          });
        }
        else {
          this.uploadTemplate();
        }
    }

    uploadTemplate() {
        const {uploadedFile, uploadedFileName} = this.state;
        const {templates} = this.state.folder;
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
                    "template_css": "hi",
                }
                this.setState({
                    folder: {...this.state.folder,
                        templates: [...templates, tempData]
                    }
                });

                return getJSONFromImg(e)
                    .then(generateHTML)
                    .then((res) => {
                        const {html_key, css_key} = res;

                        console.log(res);
                        const s3Url = "http://cse110.html.html.s3.amazonaws.com/";
                        return {
                            "created_by": this.props.user.user_id,
                            "is_public": false,
                            "template_name": uploadedFileName,
                            "template_photo_url": url,
                            "template_css": css_key,
                            "template_html": s3Url + html_key,
                        }
                    })
                    .then((data) => {
                        return createTemplate(data, this.props.user.user_id)
                            .then((res) => {
                                return addTemplateToFolder(this.props.user.user_id, this.state.folder.folder_id, res.template_id)
                                    .then((res2) => {
                                        let temps = this.state.folder.templates;
                                        const targetIdx = temps.findIndex(e => e.template_name === uploadedFileName);
                                        temps[targetIdx] = {...data, template_id: res.template_id}
                                        this.setState({
                                            folder: {...this.state.folder,
                                                templates: temps
                                            }
                                        });
                                    })
                            })
                            .catch(e => {

                            })
                    })
                    .catch((e) => {
                        alert("We Weren't Able To Find Any Boxes In Your Image. Try Again")

                        this.setState({folder: {
                            ...this.state.folder,
                            templates: this.state.folder.templates.filter(x => x.template_name !== uploadedFileName)
                        }})
                    })

            })
            this.hideUpload();
    }

    render() {

        const {folder} = this.state;
        if (!folder) {
            return (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <Loading type="spin" color='black' width="4rem"/>
                </div>
            )
        }

        return (
            <div className="home">
            <div className = "container h-100 px-0 pt-5">
                <div className="row mt-0">
                    <h1 className="home__name"> {folder.folder_name} </h1>
                    <div className="w-20 ml-auto home__name"> Sort By:
                        <Dropdown arrowClassName='myArrowClassName' options={options} onChange={this._onSelect} value={defaultOption}></Dropdown>
                    </div>
                </div>
                {this.renderTemplates()}
                <div className="row mt-5">
                    <div>
                        <button className="btn rounded-circle btn-primary home__upload shadow-lg" onClick={this.showUpload.bind(this)}>
                            <span>+</span>
                        </button>

                        <Rodal
                            visible={this.state.uploadVisible}
                            onClose={this.hideUpload.bind(this)}
                            animation="door"
                            width={600}
                            height={275}
                            customStyles={{borderRadius: 20}}
                        >
                           <div className="d-flex justify-content-left m-2 h4"> Choose a template to upload: </div>
                                <div className="d-flex justify-content-center">
                                    <ReactDropzone
                                        className="d-flex container justify-content-center"
                                        onDrop={this.onDrop.bind(this)}
                                        onFileDialogCancel={this.onCancel.bind(this)}
                                    >
                                        <div className="border rounded p-4">
                                            {/*Pick a file here*/}
                                            {this.state.uploadedFile ? this.state.uploadedFile.name : "Pick a file here"}
                                        </div>
                                    </ReactDropzone>
                                </div>
                                <label>Template Name: </label>
                                <div className="d-flex justify-content-center mb-2 w-100 mx-auto">
                                    <input className="form-control" onChange={this.onChangeName} value={this.state.uploadedFileName? this.state.uploadedFileName : ""}/>
                                </div>
                                <div className="d-flex w-100 m-2">
                                    <button className="btn btn-outline-primary m-2 ml-auto"
                                    disabled={this.state.uploadedFile == null}
                                    onClick={this.onClickUpload.bind(this)/*this.uploadTemplate*/}
                                    >
                                    Upload
                                    </button>
                                </div>
                        </Rodal>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(FolderPage);
