import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Popup from "reactjs-popup";

class TemplateOptions extends React.Component {
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

    renderRenameButton() {
        return (
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

    render() {
        return (
            <div className="template__options">
            <Dropdown direction="up" isOpen={this.state.showOptions} size="sm" toggle={this.toggle} className="row mx-0">
                <div className="col-md-6 text-md-left template__name">
                    <Link to={'/template/' + this.props.templateId}>{this.props.name}</Link>
                </div>
                <div className="col-md-6">
                    <DropdownToggle color="white">
                        <img src="/ellipse icon.jpg" width={20}/>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>Download</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Privacy</DropdownItem>
                        <DropdownItem>Move</DropdownItem>
                        <DropdownItem>Rename</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                </div>
            </Dropdown>
            </div>
        );
    }
}

export default withRouter(TemplateOptions);