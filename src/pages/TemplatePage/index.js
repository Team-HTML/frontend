import React from 'react';
import {withRouter} from 'react-router-dom';
import RenderedTemplate from './components/RenderedTemplate';
import Editor from './components/Editor';
import { Link } from 'react-router-dom';

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
    saveEditor() {
      console.log("I'm here");
    }

    downloadCode() {
      console.log("I'm downloaded");
    }

    componentDidMount(){
        console.log(this.props.match.params.templateId)
    }

    setCode(prop, newValue) {
        this.setState({[prop]: newValue});
    }

    render() {
        return (
            <div className="w-100 h-100 px-0 container-fluid w-100 mx-0">
                <div className="row">
                    <span className="col-md-2">
                        <Link to={`/folder/${this.props.templateId}`}>
                        Back
                        </Link>
                        <p>
                        MyTemplate
                        </p>
                    </span>

                    <div className="col-md-8">
                    </div>
                    <div className="col-md-2">
                        <button className="button" onClick={this.saveEditor}>
                            Save
                        </button>
                        <button className="button" onClick={this.downloadCode}>
                            Download
                        </button>
                    </div>
                </div>
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
