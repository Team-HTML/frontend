import React from 'react';
import NavbarMain from '../components/NavbarMain';

class LayoutMain extends React.Component {

    render() {
        return(
            <>
                <NavbarMain setUser={this.props.setUser}/>
                {this.props.children}
            </>
        )
    }
}

export default LayoutMain;