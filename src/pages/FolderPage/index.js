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
                        trigger={<button className="button"> Upload </button>}
                        modal
                        closeOnDocumentClick
                        >
                        <p> Choose a file to upload: </p>
                        <ReactDropzone
                            className="d-flex justify-content-center"
                            onDrop={this.onDrop}
                            >
                            <div className="border">
                                 Pick a file here 
                            </div>
                        </ReactDropzone>
                    </Popup>
                </div>
            </div>
            {this.renderTemplates()}
        </div>
      )
    }
}

export default withRouter(FolderPage);