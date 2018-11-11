import React from 'react';
import DesktopPage from '../DesktopPage';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {getFolderById} from '../../data/Api';
import Template from '../../components/Template';
import Popup from "reactjs-popup";
import ReactDropzone from "react-dropzone";
import request from "superagent";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = ['Alphabetical', 'Last Modified', 'Creation Date' ];

const defaultOption = options[0];

class FolderPage extends React.Component {

    /*componentDidMount() {
        //get folder data from server from this.props.match.params.folderId
        getFolderById()
            .then((res) => {
                this.setState({data: res})
            })

    }*/

    constructor(props) {
        super(props);
        this.state = {
            templates: [
                {
                    name: 'Template 1',
                    templateId: 1
                },
                {
                    name: 'Template 2',
                    templateId: 2
                },
                {
                    name: 'Template 3',
                    templateId: 3
                },
                {
                    name: 'Template 4',
                    templateId: 4
                }
            ],
            uploadedFile: null,
            open: false
        }

        this.uploadTemplate = this.uploadTemplate.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal (){
        this.setState({ open: true })
    }
    closeModal () {
        this.setState({ open: false })
    }

    onDrop(a) {
        console.log(a);
        this.setState({uploadedFile: a[0]});
    }

    /*onDrop = (files) => {
        // POST to a test endpoint for demo purposes
        const req = request.post('');
    
        files.forEach(file => {
          req.attach(file.name, file);
        });
    
        req.end();
    }*/

    renderTemplates() {
        const {templates} = this.state;

        return (
            <div className="row">
                {templates.map(d => {
                    return (
                        <div className="col-md-3 templateRow">
                            <Template {...d} />
                            <p>name: {d.name}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    uploadTemplate() {
        const {uploadedFile, templates} = this.state;

        this.setState({templates: [...templates, {name: uploadedFile.name, templateId: 5}]})
    }

    render() {
      return (
        <div className = "home mt-5">
            <div className="container">
                <div className="row mx-0">
                    <h1>Folder Name </h1>
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
                {this.renderTemplates()}
            </div>
        </div>
      )
    }
}

export default withRouter(FolderPage);