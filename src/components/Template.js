import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import TemplateOptions from './TemplateOptions';
import TemplatePreview from './TemplatePreview';
class Template extends React.Component {

    render() {
        return (

            <div className={((this.props.template_html) ? "" : "template__blur " ) + "template shadow mb-4"}>
                        <Link to={'/template/' + this.props.template_id} className="h-100">
                    <TemplatePreview html={this.props.template_html} />

                <div className="col-md-6 template__name">
                        {this.props.template_name ? this.props.template_name: " "}
                </div>
            </Link>
                <div className="text-md-right"><TemplateOptions {...this.props} /></div>
            </div>


        );
    }
}

export default withRouter(Template);
