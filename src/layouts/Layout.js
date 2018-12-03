import React from 'react';
import Navbar from '../components/Navbar';

class Layout extends React.Component {

    render() {
        return(
            <>
                <Navbar setUser={this.props.setUser}/>
                {this.props.children}
            </>
        )
    }
}

export default Layout;