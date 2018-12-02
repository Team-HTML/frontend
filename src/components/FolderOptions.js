import React from 'react';
import {withRouter} from 'react-router-dom';
import Popup from "reactjs-popup";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Rodal from 'rodal';

import 'rodal/lib/rodal.css';

class FolderOptions extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            showOptions: false,
            renameVisible: false,
            deleteVisible: false,
        };
    }

    toggle() {
        this.setState(prevState => ({
            showOptions: !prevState.showOptions
        }));
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

    renderRenameFolder() {
        return(
            /*<Popup
                trigger={<button className="btn btn-outline-primary border-0 btn-block">Rename</button>}
                modal={true}
                closeOnDocumentClick
                >
                <div className="d-flex container justify-content-center">
                    <h4> Please enter new name of folder below: </h4>
                </div>
                <div className="d-flex container justify-content-center">
                    <input type="text" /*value={this.state.addFolder}
                    onChange={(evt) => this.updateAddFolder(evt)} />
                </div>
                <div className="d-flex container justify-content-center mt-3">
                    <button /*onClick={this.createFolder} className="btn btn-outline-dark"> Submit </button>
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
                </Rodal>
            </div>
        )
    }

    renderDeleteFolder() {
        return(
            /*<Popup
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
                </Rodal>
            </div>
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