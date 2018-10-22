import React from 'react';
import Navbar from '../components/Navbar';

class Layout extends React.Component {

    render() {
        return(
            <>
                <Navbar />
                {this.props.children}
            </>
        )
    }
}

export default Layout;