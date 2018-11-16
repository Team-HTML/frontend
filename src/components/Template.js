import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import TemplateOptions from './TemplateOptions';


class Template extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        return (
            <div className="template shadow">
                <iframe className="template__frame w-100 m-0 text-center vertical-center"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
                >
                </iframe>
                <div className="text-md-right"><TemplateOptions {...this.props} /></div>
            </div>
        );
    }
}

export default withRouter(Template);
