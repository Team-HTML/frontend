import React from 'react';
import NavbarMain from '../components/NavbarMain';

class LayoutMain extends React.Component {

    render() {
        return(
            <>
                <NavbarMain />
                {this.props.children}
            </>
        )
    }
}

export default LayoutMain;