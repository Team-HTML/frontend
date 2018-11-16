import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import TemplateOptions from './TemplateOptions';
import TemplatePreview from './TemplatePreview';

class Template extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        return (
            <div className="template shadow">
                <TemplatePreview html={'<h1>xd</h1>'} />
                <div className="text-md-right"><TemplateOptions {...this.props} /></div>
            </div>
        );
    }
}

export default withRouter(Template);
