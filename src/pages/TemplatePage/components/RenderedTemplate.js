import React from 'react';

class RenderedTemplate extends React.Component {
    render() {

        return (
            <iframe className="w-100 h-100 container-fluid px-0" src={this.props.html}>
            </iframe>
        )
    }
}

export default RenderedTemplate;
