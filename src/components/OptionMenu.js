import React from 'react';
import {withRouter} from 'react-router-dom';
import DesktopPage from '../pages/DesktopPage';

class OptionMenu extends React.Component {

    constructor() {
        super();
        
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.state = {
            showMenu: false,
        }
    }

    showMenu() {
        if (!this.state.showMenu) {
            document.addEventListener('click', this.closeMenu, false);
        }
        else {
            document.removeEventListener('click', this.closeMenu, false);
        }

        this.setState(prevState => ({
            showMenu: !prevState.showMenu,
        }));
    }

    closeMenu(e) {
        if (this.node.contains(e.target)) {
            return;
        }

        this.showMenu();
    }
    
    render() {
        return (
            <div className="menu-container" ref={node => { this.node = node; }}>
                <img src="./ellipse icon.jpg" width={20} onClick={this.showMenu}/>
                
                { this.state.showMenu ? 
                    ( <div className="menu">
                        <button>Rename</button>
                        <button>Delete</button>
                    </div> ) :
                    ( null )
                }
            </div>
        );
    }
}

export default withRouter(OptionMenu);