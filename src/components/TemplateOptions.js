import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Popup from "reactjs-popup";
import Switch from "react-switch";
import Rodal from 'rodal';

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
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
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
              <span className="btn-link disabled">Public: </span>
              <Switch
                onClick={this.handleChange}
                checked={this.state.checked}
                className="react-switch"
                id="normal-switch"
              />
              </div>
            </label>
        );
      }

    renderMoveTemplate() {
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
                    <button type="button" class="btn btn-outline-dark m-2"/*onClick={this.createFolder}*/> Folder1 </button>
                    <button type="button" class="btn btn-outline-dark m-2"/*onClick={this.createFolder}*/> Folder2 </button>
                    <button type="button" class="btn btn-outline-dark m-2"/*onClick={this.createFolder}*/> Folder3 </button>
                </div>
            </Popup>
        )
    }

    renderRenameTemplate() {
        return(
            /*<Popup
                trigger={<button className="btn btn-outline-primary border-0 btn-block">Rename</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h4> Please enter new name of template below: </h4>
                </div>
                <div className="d-flex container justify-content-center">
                    <input type="text" /*value={this.state.addFolder}
                    onChange={(evt) => this.updateAddFolder(evt)} />
                </div>
                <div className="d-flex container justify-content-center">
                    <button type="button" class="btn btn-outline-dark m-2" /*onClick={this.createFolder}> Submit </button>
                </div>
            </Popup>*/

            <div>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.showRename.bind(this)}>Rename</button>

                <Rodal 
                    visible={this.state.renameVisible} 
                    onClose={this.hideRename.bind(this)} 
                    animation="door"
                    width="600"
                    height="150"
                >
                    <div className="d-flex container justify-content-left">
                        <h4> Please enter new name of template below: </h4>
                    </div>
                    <div className="d-flex container justify-content-center">
                        <input className="form-control" /*value={this.state.addFolder}
                        onChange={(evt) => this.updateAddFolder(evt)}*/ />
                    </div>
                    <div className="d-flex container w-90 mt-2">
                        <button type="button" class="btn btn-outline-primary ml-auto" /*onClick={this.createFolder}*/> Submit </button>
                    </div>
                </Rodal>
            </div>
        )
    }

    renderDeleteTemplate() {
        return(
            /*<Popup
                trigger={<button className="btn btn-outline-primary border-0 btn-block">Delete</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h4> Are you sure you want to delete this template? </h4>
                </div>
                {/*<div className="d-flex container justify-content-center">
                    <input type="text" value={this.state.addFolder}
                    onChange={(evt) => this.updateAddFolder(evt)} />
                 </div> }
                <div className="d-flex container justify-content-center">
                    <button type="button" class="btn btn-outline-dark m-2"/*onClick={this.createFolder}> Yes </button>
                    <button type="button" class="btn btn-outline-dark m-2"/*onClick={this.createFolder}> No </button>
                </div>
            </Popup>*/

            <div>
                <button className="btn btn-outline-primary border-0 btn-block" onClick={this.showDelete.bind(this)}>Delete</button>

                <Rodal 
                    visible={this.state.deleteVisible} 
                    onClose={this.hideDelete.bind(this)} 
                    animation="door"
                    width="600"
                    height="125"
                >
                    <div className="d-flex container justify-content-center">
                        <h4> Are you sure you want to delete this template? </h4>
                    </div>
                    {/*<div className="d-flex container justify-content-center">
                        <input type="text" value={this.state.addFolder}
                        onChange={(evt) => this.updateAddFolder(evt)} />
                    </div> */}
                    <div className="d-flex container justify-content-center">
                        <button type="button" class="btn btn-outline-primary m-2"/*onClick={this.createFolder}*/> Yes </button>
                        <button type="button" class="btn btn-outline-dark m-2"/*onClick={this.createFolder}*/> No </button>
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