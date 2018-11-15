import React from 'react';
import {withRouter} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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

    render() {
        return (
            <Dropdown direction="up" isOpen={this.state.showOptions} size="sm" toggle={this.toggle}>
                <DropdownToggle color="white">
                    <img src="./ellipse icon.jpg" width={20}/>
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
            </Dropdown>
        );
    }
}

export default withRouter(TemplateOptions);