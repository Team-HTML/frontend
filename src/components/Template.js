import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import TemplateOptions from './TemplateOptions';


class Template extends React.Component {

    render() {
        return (
            <div>
                <Link to={`/template/${this.props.templateId}`}>
                <   div className="folder my-3 text-center vertical-center">
                        <div className="folder__name">
                            {this.props.name}
                        </div>
                    </div>
                </Link>
                <div className="templateMenu text-md-right"><TemplateOptions /></div>
            </div>
        );
    }
}

export default withRouter(Template);