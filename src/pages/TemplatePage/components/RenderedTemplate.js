import React from 'react';

class RenderedTemplate extends React.Component {

    render() {

        return (
            <div className="template container-fluid px-0" dangerouslySetInnerHTML={{__html: this.props.html}}>
            </div>
        )
    }
}

export default RenderedTemplate;