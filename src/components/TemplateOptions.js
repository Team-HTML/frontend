import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Popup from "reactjs-popup";
import Switch from "react-switch";
import Rodal from 'rodal';

import {
    setTemplatePublic, 
    renameTemplate, 
    deleteTemplate, 
    moveTemplate,
    downloadProject
} from '../data/Api'

import 'rodal/lib/rodal.css';

class TemplateOptions extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            showOptions: false,
            moveVisible: false,
            renameVisible: false,
            deleteVisible: false,
            renameTemplate: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateName = this.updateName.bind(this);
        this.renameTemplateMethod = this.renameTemplateMethod.bind(this);
        this.deleteTemplateMethod = this.deleteTemplateMethod.bind(this);
        this.moveTemplateMethod = this.moveTemplateMethod.bind(this);
        this.download = this.download.bind(this);
    }

    handleChange(checked) {
        
        setTemplatePublic(this.props.user.user_id, this.props.template_id, checked)
            .then(res => {
                this.props.setPublicTemplateById(this.props.template_id, checked)
                //window.location.reload();
            })
    }

    toggle() {
        this.setState(prevState => ({
            showOptions: !prevState.showOptions
        }));
    }

    showMove() {
        this.setState({ moveVisible: true });
    }
 
    hideMove() {
        this.setState({ moveVisible: false });
    }

    showRename() {
        this.setState({ renameVisible: true });
    }

    onClickRename(e) {
        this.renameTemplateMethod();
        this.hideRename();
    }

    onClickDelete(e) {
        this.hideDelete();
        this.deleteTemplateMethod();
    }

    renameTemplateMethod() {
        renameTemplate(this.props.user.user_id, this.props.template_id, this.state.renameTemplate)
            .then(res => {
                this.props.renameTemplateById(this.props.template_id, this.state.renameTemplate)
            })
    }

    deleteTemplateMethod() {
        deleteTemplate(this.props.user.user_id, this.props.template_id, this.props.match.params.folderId || this.props.user.user_id)
            .then(res => {
                this.props.deleteTemplateById(this.props.template_id);
            })
    }
 
    hideRename() {
        this.setState({ renameVisible: false });
    }

    showDelete() {
        this.setState({ deleteVisible: true });
    }
 
    hideDelete() {
        this.setState({ deleteVisible: false });
    }

    renderPublicSwitch() {
        return (
            <label htmlFor="normal-switch mx-2">
              <div className="d-flex justify-content-center"> 
              <span className="btn-link disabled mr-2">Public: </span>
              <Switch
                onChange={this.handleChange}
                checked={this.props.is_public}
                className="react-switch mt-1"
                id="normal-switch"
                height={20}
                width={50}
              />
              </div>
            </label>
        );
      }

    renderDownloadTemplate() {
        return (
            <div style={{width: '100%'}}>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.download}>Download</button>
            </div>
        )
    }

    download() {
        downloadProject(this.props.template_id)
        .then(({key}) => {
            //$('#downloader').attr('href', key);
            //$('#downloader').click()

            window.open(key)
        })
        .catch(console.error)
    }

    moveTemplateMethod(newFolderId) {
        moveTemplate(this.props.user.user_id, this.props.template_id, this.props.match.params.folderId || this.props.user.user_id, newFolderId)
            .then(res => {
                this.props.deleteTemplateById(this.props.template_id);
            })
    }

    renderMoveTemplate() {
        const {user} = this.props;

        let arr = []

        if (user.folders) {
            arr = user.folders.filter(x => (x.folder_id !== parseInt(this.props.match.params.folderId, 10)))
        }

        if (this.props.match.params.folderId) {
            arr.push({folder_name: 'Home Page', folder_id: user.default_folder.folder_id})
        }
        return(
            /*<Popup
                trigger={<button className="btn btn-outline-primary border-0 btn-block">Move</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h4> Which folder would you like to move it to? </h4>
                </div>
                {/*<div className="d-flex container justify-content-center">
                    <input type="text" value={this.state.addFolder}
                    onChange={(evt) => this.updateAddFolder(evt)} />
                 </div> }
                <div className="d-flex container justify-content-center">
                    //add div with className row here
                    {
                        arr.map(u => {
                            return (<button type="button" class="btn btn-outline-dark m-2" onClick={e => this.moveTemplateMethod(u.folder_id)}> 
                                {u.folder_name} 
                            </button>)
                        })
                    
                    }
                        
                    
                </div>
            </Popup>*/

            <div style={{width: '100%'}}>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.showMove.bind(this)}>Move</button>

                <Rodal 
                    visible={this.state.moveVisible} 
                    onClose={this.hideMove.bind(this)} 
                    animation="door"
                    width={600}
                    customStyles={{borderRadius: 20}}
                >
                    <div className="d-flex container justify-content-left">
                        <h4> Which folder would you like to move it to? </h4>
                    </div>
                    {/*<div className="d-flex container justify-content-center">
                        <input type="text" value={this.state.addFolder}
                        onChange={(evt) => this.updateAddFolder(evt)} />
                    </div> */}

                    <div className="d-flex container justify-content-left">
                        <div className="row template__move">
                        {
                            arr.map(u => {
                                return (<div className="col-md"><button type="button" className="btn btn-outline-primary m-2" onClick={e => this.moveTemplateMethod(u.folder_id)}> 
                                    {u.folder_name} 
                                </button></div>)
                            })
                        }
                        </div>
                    </div>
                </Rodal>
            </div>
        )
    }

    updateName(e) {
        this.setState({renameTemplate: e.target.value});
    }

    renderRenameTemplate() {
        return(

            <div style={{width: '100%'}}>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.showRename.bind(this)}>Rename</button>

                <Rodal 
                    visible={this.state.renameVisible} 
                    onClose={this.hideRename.bind(this)} 
                    animation="door"
                    width={600}
                    height={150}
                    customStyles={{borderRadius: 20}}
                >
                    <div className="d-flex container justify-content-left">
                        <h4> Please enter new name of template below: </h4>
                    </div>
                    <div className="d-flex container justify-content-center">
                        <input className="form-control" value={this.state.renameTemplate}
                        onChange={this.updateName} />
                    </div>
                    <div className="d-flex container w-90 mt-2">
                        <button type="button" className="btn btn-outline-primary ml-auto" onClick={this.onClickRename.bind(this)/*this.renameTemplateMethod*/}> Submit </button>
                    </div>
                </Rodal>
            </div>
        )
    }

    renderDeleteTemplate() {
        return(

            <div style={{width: '100%'}}>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.showDelete.bind(this)}>Delete</button>

                <Rodal 
                    visible={this.state.deleteVisible} 
                    onClose={this.hideDelete.bind(this)} 
                    animation="door"
                    width={600}
                    height={125}
                    customStyles={{borderRadius: 20}}
                >
                    <div className="d-flex container justify-content-center">
                        <h4> Are you sure you want to delete this template? </h4>
                    </div>
                    {/*<div className="d-flex container justify-content-center">
                        <input type="text" value={this.state.addFolder}
                        onChange={(evt) => this.updateAddFolder(evt)} />
                    </div> */}
                    <div className="d-flex container justify-content-center">
                        <button type="button" className="btn btn-outline-primary m-2" onClick={this.onClickDelete.bind(this)/*this.deleteTemplateMethod*/}> Yes </button>
                        <button type="button" className="btn btn-outline-dark m-2" onClick={this.hideDelete.bind(this)}> No </button>
                    </div>
                </Rodal>
            </div>
        )
    }

    render() {
        return (
            <div className="">

                <Popup 
                    /*trigger={<button class="border-0"> <img src="/ellipse icon.jpg" width={20}/></button>}*/
                    trigger={<img src="/ellipse icon.jpg" width={20} className="mr-1"/>}
                    on="hover"
                    position="top left"
                    contentStyle={{width: 150}}>
                    <div>
                        <div className="d-flex justify-content-center">{this.renderPublicSwitch()}</div>
                        <div className="d-flex justify-content-center">{this.renderDownloadTemplate()}</div>
                        <div className="d-flex justify-content-center">{this.renderMoveTemplate()}</div>
                        <div className="d-flex justify-content-center">{this.renderRenameTemplate()}</div>
                        <div className="d-flex justify-content-center">{this.renderDeleteTemplate()}</div>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default withRouter(TemplateOptions);