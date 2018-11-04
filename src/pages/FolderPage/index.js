import React from 'react';
import DesktopPage from '../DesktopPage';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {getFolderById} from '../../data/Api';
import Template from '../../components/Template';
import Popup from "reactjs-popup";
import ReactDropzone from "react-dropzone";
import request from "superagent";


class FolderPage extends React.Component {

    /*componentDidMount() {
        //get folder data from server from this.props.match.params.folderId
        getFolderById()
            .then((res) => {
                this.setState({data: res})
            })

    }*/

    onDrop = (files) => {
        // POST to a test endpoint for demo purposes
        const req = request.post('');
    
        files.forEach(file => {
          req.attach(file.name, file);
        });
    
        req.end();
      }

    renderTemplates() {
        const data = [
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
            }
        ]
  
        return (
            <div className="row">
                {data.map(d => {
                    return (
                        <div className="col-md-3 templateRow">
                            <Template {...d} />
                            <p>name: public</p>
                        </div>
                    );
                })}
            </div>
        );
    }
    render() {
      return (
        <div>
            <div>
                <div className="title">
                    <h1>Folder</h1>
                </div>
                <div>
                    <Popup
                        className = "h-25 w-25"
                        trigger={<button className="button"> Upload </button>}
                        modal
                        closeOnDocumentClick
                        >
                        <p> Choose a template to upload: </p>
                        <div className="border d-flex justify-content-center w-75 h-75">
                        <ReactDropzone
                            className="border"
                            onDrop={this.onDrop}
                            >
                            <div className="p-3 ">
                                 Pick a file here
                            </div>
                        </ReactDropzone>
                        </div>
                    </Popup>
                </div>
            </div>
            {this.renderTemplates()}
        </div>
      )
    }
}

export default withRouter(FolderPage);