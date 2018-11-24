import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Popup from "reactjs-popup";
import Switch from "react-switch";

class TemplateOptions extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            showOptions: false,
            checked: false,
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

    renderPublicSwitch() {
        return (
            <label htmlFor="normal-switch">
              <div className="d-flex justify-content-center"> 
              <span className="btn-link disabled mr-2">Public: </span>
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
                trigger={<button className="btn btn-link">Move</button>}
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
            <Popup
                trigger={<button className="btn btn-link">Rename</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h4> Please enter new name of template below: </h4>
                </div>
                <div className="d-flex container justify-content-center">
                    <input type="text" /*value={this.state.addFolder}
                    onChange={(evt) => this.updateAddFolder(evt)}*/ />
                </div>
                <div className="d-flex container justify-content-center">
                    <button type="button" class="btn btn-outline-dark m-2" /*onClick={this.createFolder}*/> Submit </button>
                </div>
            </Popup>
        )
    }

    renderDeleteTemplate() {
        return(
            <Popup
                trigger={<button className="btn btn-link">Delete</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h4> Are you sure you want to delete this template? </h4>
                </div>
                {/*<div className="d-flex container justify-content-center">
                    <input type="text" value={this.state.addFolder}
                    onChange={(evt) => this.updateAddFolder(evt)} />
                 </div> */}
                <div className="d-flex container justify-content-center">
                    <button type="button" class="btn btn-outline-dark m-2"/*onClick={this.createFolder}*/> Yes </button>
                    <button type="button" class="btn btn-outline-dark m-2"/*onClick={this.createFolder}*/> No </button>
                </div>
            </Popup>
        )
    }

    render() {
        return (
            <div className={"template__options"}>
                <div className="col-md-8 text-md-left template__name">
                    <Link to={'/template/' + this.props.template_id}>{this.props.template_name}</Link>
                </div>
                <Popup 
                    trigger={<button class="border-0"> <img src="/ellipse icon.jpg" width={20}/></button>} 
                    on="click"
                    position="top left">
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