import React from 'react';
import {withRouter} from 'react-router-dom';
import Popup from "reactjs-popup";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class FolderOptions extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            showOptions: false,
        };
    }

    toggle() {
        this.setState(prevState => ({
            showOptions: !prevState.showOptions
        }));
    }

    renderRenameFolder() {
        return(
            <Popup
                trigger={<button className="btn btn-link">Rename</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h3> Please enter new name of folder below: </h3>
                </div>
                <div className="d-flex container justify-content-center">
                    <input type="text" /*value={this.state.addFolder}
                    onChange={(evt) => this.updateAddFolder(evt)}*/ />
                </div>
                <div className="d-flex container justify-content-center">
                    <button /*onClick={this.createFolder}*/> Submit </button>
                </div>
            </Popup>
        )
    }

    renderDeleteFolder() {
        return(
            <Popup
                trigger={<button className="btn btn-link">Delete</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h3> Are you sure you want to delete this folder? </h3>
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
            /*
            <Dropdown direction="up" isOpen={this.state.showOptions} size="sm" toggle={this.toggle}>
                <DropdownToggle color="white">
                    <img src="/ellipse icon.jpg" width={20}/>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>Rename</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            */

            <Popup 
                trigger={<button class="btn-outline-light"> <img src="/ellipse icon.jpg" width={20}/></button>} 
                on="click"
                position="left center">
                <div>
                    <div className="d-flex justify-content-center">{this.renderRenameFolder()}</div>
                    <div className="d-flex justify-content-center">{this.renderDeleteFolder()}</div>
                </div>
            </Popup>
        );
    }
}

export default withRouter(FolderOptions);