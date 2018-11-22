import React from 'react';
import {withRouter} from 'react-router-dom';
import {getFolderById} from '../../data/Api';
import Template from '../../components/Template';
import Popup from "reactjs-popup";
import ReactDropzone from "react-dropzone";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Loading from 'react-loading';
import {uploadImgToS3, getJSONFromImg, generateHTML, createTemplate} from '../../data/Api';
const options = ['Alphabetical', 'Last Modified', 'Creation Date' ];

const defaultOption = options[0];

class FolderPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            folder: null,
            error: null,
            uploadedFile: null,
            open: false
        }

        this.uploadTemplate = this.uploadTemplate.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        //get folder data from server from the route param 
        //this.props.match.params.folderId

        getFolderById(this.props.match.params.folderId)
            .then((res) => {
                this.setState({folder: res})
            })
            .catch((e) => {
                this.props.history.push('/404');
            })

    }

    onDrop(a) {
        this.setState({uploadedFile: a[0]});
    }

    renderTemplates() {
        const {templates} = this.state.folder
        return (
            <div className="row mt-5">
                {templates.map(d => {
                    return (
                        <div className="col-md-3">
                            <Template {...d} />
                        </div>
                    );
                })}
            </div>
        );
    }

    uploadTemplate() {
        const {uploadedFile} = this.state;
        const {templates} = this.state.folder;
        const epoch = Math.round((new Date()).getTime() / 1000);
        uploadImgToS3(uploadedFile, epoch)
            .then((res) => {
                const {url} = res.req;
                return {url, e: epoch + "." + uploadedFile.type.split('/')[1]};
            })
            .then(({url, e}) => {
                return getJSONFromImg(e)
                    .then(generateHTML)
                    .then(html => {
                        return {
                            "created_by": 1213123,
                            "is_public": false,
                            "template_name": "HOLY SHIT",
                            "template_photo_url": url,
                            "template_css": ".fuck {}",
                            "template_html": html.replace(/"/g, '\\"')
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        return createTemplate(data)
                            .then(() => {
                                console.log(
                                    "here"
                                );
                                console.log([...templates, data]);  
                                this.setState({
                                    folder: {...this.state.folder, 
                                        templates: [...templates, data]
                                    }
                                });
                            })
                            .catch(console.error)
                    })
                    .catch(console.error)
                
            })

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
            <div className = "container px-0 mt-5">
                <div className="row mt-0">
                    <div className="col-md-6">
                        <h1> {folder.folder_name} </h1>
                    </div>
                    <div className="col-md-6">
                        <div className="w-25 ml-auto"> Sort By:
                            <Dropdown arrowClassName='myArrowClassName' options={options} onChange={this._onSelect} value={defaultOption}></Dropdown>
                        </div>
                    </div>
                </div>
                {this.renderTemplates()}
                <div className="row mt-5">
                    <Popup
                        trigger={<button className="btn rounded-circle btn-primary home__upload"><span>+</span></button>}
                        modal
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
                    </Popup>
                </div>
            </div>
        )
    }
}

export default withRouter(FolderPage);