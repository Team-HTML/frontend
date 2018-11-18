import React from 'react';
import {withRouter} from 'react-router-dom';
import TemplateOptions from './TemplateOptions';
import TemplatePreview from './TemplatePreview';
import html from '../data/placeholder';
class Template extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        return (
            <div className="template shadow">
                <TemplatePreview html={html} />
                <div className="text-md-right">
                    <TemplateOptions {...this.props} />
                </div>
            </div>
        );
    }
}

export default withRouter(Template);
