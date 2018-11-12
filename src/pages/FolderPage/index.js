import React from 'react';
import {withRouter} from 'react-router-dom';
import {getFolderById} from '../../data/Api';
import Template from '../../components/Template';
import Loading from 'react-loading';


class FolderPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            folder: null,
            error: null
        }
    }

    componentDidMount() {
        //get folder data from server from the route param 
        //this.props.match.params.folderId

        getFolderById(this.props.match.params.folderId)
            .then((res) => {
                this.setState({folder: res})
            })
            .catch((e) => {
                this.setState({error: e.message})
            })

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
                        <div className="col-md-3">
                            <Template {...d} />
                            <p>name: public</p>
                        </div>
                    );
                })}
            </div>
        );
    }
    render() {

        const {folder, error} = this.state;

        if (error) {
            return (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <h1> Something Went Wrong 😞 : {error}  </h1>
                </div>
            )        
        }

        if (!folder) {
            return (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <Loading type="spin" color='black' width="4rem"/>
                </div>
            )
        }

        return (
            <div className="container px-0 mt-5">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h1>{folder.folder_name}</h1>
                    </div>
                </div>
                {this.renderTemplates()}
            </div>
            )
        }
}

export default withRouter(FolderPage);