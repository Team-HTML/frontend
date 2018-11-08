import React from 'react';
import {withRouter} from 'react-router-dom';
import RenderedTemplate from './components/RenderedTemplate';
import Editor from './components/Editor';

class TemplatePage extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            htmlCode: `<html>
    <div>
        <marquee> Look it works!!!! </marquee>
    </div>
</html>`,
            cssCode: `.blue {
    color: blue;
}`
        }

        this.setCode = this.setCode.bind(this);
    }

    setCode(prop, newValue) {
        this.setState({[prop]: newValue});
    }

    render() {
        return (
            <div className="template px-0 container-fluid w-100 mx-0">
                <div className="h-100 w-100 row mx-0">
                    <div className="col-md-6 px-0">
                        <div className="container w-100 h-100 px-0">
                            <Editor setCode={this.setCode} {...this.state} />
                        </div>
                    </div>
                    <div className="col-md-6 px-0">
                        <RenderedTemplate html={this.state.htmlCode} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TemplatePage);
