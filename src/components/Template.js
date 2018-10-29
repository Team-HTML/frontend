import React from 'react';
import {Link, withRouter} from 'react-router-dom';


class Template extends React.Component {

    render() {
        return (
            <Link to={`/template/${this.props.templateId}`}>
                <div className="folder my-3 text-center vertical-center">
                    <div className="folder__name">
                        {this.props.name}
                    </div>
                </div>
            </Link>
        );
    }
}

export default withRouter(Template);