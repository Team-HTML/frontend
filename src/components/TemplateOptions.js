import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Popup from "reactjs-popup";
import Switch from "react-switch";
import Rodal from 'rodal';

import {setTemplatePublic, renameTemplate, deleteTemplate, moveTemplate} from '../data/Api'

import 'rodal/lib/rodal.css';

class TemplateOptions extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            showOptions: false,
            checked: false,
            moveVisible: false,
            renameVisible: false,
            deleteVisible: false,
            renameTemplate: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateName = this.updateName.bind(this);
        this.renameTemplateMethod = this.renameTemplateMethod.bind(this);
        this.deleteTemplateMethod = this.deleteTemplateMethod.bind(this);
        this.moveTemplateMethod = this.moveTemplateMethod.bind(this);
        this.getCheckedState = this.getCheckedState.bind(this);
    }

    handleChange(checked) {

        console.log(this.props);
        setTemplatePublic(this.props.user.user_id, this.props.template_id, checked)
            .then((r) => {
                console.log("HELP" + r);
                this.setState({ checked: checked});
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

    getCheckedState() {
        this.setState({ checked: this.props.is_public});
    }

    renderPublicSwitch() {

        return (
            <label htmlFor="normal-switch mx-2">
              <div className="d-flex justify-content-center"> 
              <span className="btn-link disabled">Public: </span>
              <Switch
                onChange={this.handleChange}
                checked={this.getCheckedState}
                className="react-switch"
                id="normal-switch"
              />
              </div>
            </label>
        );
      }

    moveTemplateMethod(newFolderId) {
        moveTemplate(this.props.user.user_id, this.props.template_id, this.props.match.params.folderId || this.props.user.user_id, newFolderId)
            .then(res => {
                this.props.deleteTemplateById(this.props.template_id);
            })
    }

    renderMoveTemplate() {
        const {user} = this.props;

        let arr = user.folders.filter(x => x.folder_id !== this.props.match.params.folderId)

        if (this.props.match.params.folderId) {
            arr.push({folder_name: 'Home Page', folder_id: user.default_folder.folder_id})
        }

        return(
            <Popup
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
                 </div> */}
                <div className="d-flex container justify-content-center">

                    {
                        arr.map(u => {
                            return (<button type="button" class="btn btn-outline-dark m-2" onClick={e => this.moveTemplateMethod(u.folder_id)}> 
                                {u.folder_name} 
                            </button>)
                        })
                    
                    }
                        
                    
                </div>
            </Popup>
        )
    }

    updateName(e) {
        this.setState({renameTemplate: e.target.value});
    }

    renderRenameTemplate() {
        return(

            <div>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.showRename.bind(this)}>Rename</button>

                <Rodal 
                    visible={this.state.renameVisible} 
                    onClose={this.hideRename.bind(this)} 
                    animation="door"
                    width="600"
                    height="150"
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
                        <button type="button" className="btn btn-outline-primary ml-auto" onClick={this.renameTemplateMethod}> Submit </button>
                    </div>
                </Rodal>
            </div>
        )
    }

    renderDeleteTemplate() {
        return(

            <div>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.showDelete.bind(this)}>Delete</button>

                <Rodal 
                    visible={this.state.deleteVisible} 
                    onClose={this.hideDelete.bind(this)} 
                    animation="door"
                    width="600"
                    height="125"
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
                        <button type="button" className="btn btn-outline-primary m-2"onClick={this.deleteTemplateMethod}> Yes </button>
                        <button type="button" className="btn btn-outline-dark m-2"/*onClick={this.createFolder}*/> No </button>
                    </div>
                </Rodal>
            </div>
        )
    }

    render() {
        return (
            <div className={"template__options"}>

                <Popup 
                    /*trigger={<button class="border-0"> <img src="/ellipse icon.jpg" width={20}/></button>}*/
                    trigger={<img src="/ellipse icon.jpg" width={20}/>}
                    on="hover"
                    position="top left"
                    className="option-popup">
                    <div>
                        <div className="d-flex justify-content-center">{this.renderPublicSwitch()}</div>
                        <div className="d-flex justify-content-center btn-link m-2">Download</div>
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