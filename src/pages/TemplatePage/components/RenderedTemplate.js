import React from 'react';

class RenderedTemplate extends React.Component {
    render() {

        return (
            <div className="w-100 h-100 container-fluid px-0" dangerouslySetInnerHTML={{__html: this.props.html}}>
            </div>
        )
    }
}

export default RenderedTemplate;
