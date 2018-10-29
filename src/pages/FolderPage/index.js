import React from 'react';
import HomePage from '../HomePage';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {getFolderById} from '../../data/Api';
import Template from '../../components/Template';


class FolderPage extends React.Component {

    /*componentDidMount() {
        //get folder data from server from this.props.match.params.folderId
        getFolderById()
            .then((res) => {
                this.setState({data: res})
            })

    }*/

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
          <div className="title">
            <h1>Folder</h1>
          </div>
            {this.renderTemplates()}
        </div>
      )
    }
}

export default withRouter(FolderPage);