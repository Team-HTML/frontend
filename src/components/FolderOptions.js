import React from 'react';
import {withRouter} from 'react-router-dom';
import Popup from "reactjs-popup";
import Rodal from 'rodal';
import {deleteFolder, renameFolder} from '../data/Api';
import 'rodal/lib/rodal.css';

class FolderOptions extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            showOptions: false,
            renameVisible: false,
            deleteVisible: false,
            renameName: null
        }
        this.deleteFolderMethod = this.deleteFolderMethod.bind(this);
        this.renameFolderMethod = this.renameFolderMethod.bind(this);
    }

    updateName(key, val) {
        this.setState({[key]: val})
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

    onClickRename(e) {
        this.renameFolderMethod();
        this.hideRename();
    }

    onClickDelete(e) {
        this.hideDelete();
        this.deleteFolderMethod();
    }

    renameFolderMethod() {
        renameFolder(this.props.user.user_id, this.props.folder_id, this.state.renameName)
            .then(res => {
                console.log(this.props)
                this.props.renameFolderById(this.props.folder_id, this.state.renameName)
            })
    }

    renderRenameFolder() {
        return(
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
                        <h4> Please enter new name of folder below: </h4>
                    </div>
                    <div className="d-flex container justify-content-center">
                        <input className="form-control" value={this.state.renameName}
                        onChange={(evt) => this.updateName('renameName', evt.target.value)} />
                    </div>
                    <div className="d-flex container justify-content-center mt-2">
                        <button onClick={this.onClickRename.bind(this)/*this.renameFolderMethod*/} className="btn btn-outline-primary ml-auto"> Submit </button>
                    </div>
                </Rodal>
            </div>
        )
    }

    deleteFolderMethod() {
        deleteFolder(this.props.user.user_id, this.props.folder_id)
            .then(res => {
                this.props.deleteFolderById(this.props.folder_id)
            })
    }

    renderDeleteFolder() {
        return(
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
                    <div className="d-flex container justify-content-center">
                        <button type="button" class="btn btn-outline-primary m-2" onClick={this.onClickDelete.bind(this)/*this.deleteFolderMethod*/}> Yes </button>
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