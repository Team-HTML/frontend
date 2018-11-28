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
                trigger={<button className="btn btn-outline-primary border-0 btn-block">Rename</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h4> Please enter new name of folder below: </h4>
                </div>
                <div className="d-flex container justify-content-center">
                    <input type="text" /*value={this.state.addFolder}
                    onChange={(evt) => this.updateAddFolder(evt)}*/ />
                </div>
                <div className="d-flex container justify-content-center mt-3">
                    <button /*onClick={this.createFolder}*/ className="btn btn-outline-dark"> Submit </button>
                </div>
            </Popup>
        )
    }

    renderDeleteFolder() {
        return(
            <Popup
                trigger={<button className="btn btn-outline-primary border-0 btn-block">Delete</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h4> Are you sure you want to delete this folder? </h4>
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
                /*trigger={<button class="bg-white border-0 "> <img src="/ellipse icon.jpg" width={20}/></button>}*/
                trigger={<img src="/ellipse icon.jpg" width={20}/>}
                on="hover"
                position="top left"
                className="option-popup">
                <div>
                    <div className="d-flex justify-content-center">{this.renderRenameFolder()}</div>
                    <div className="d-flex justify-content-center">{this.renderDeleteFolder()}</div>
                </div>
            </Popup>
        );
    }
}

export default withRouter(FolderOptions);