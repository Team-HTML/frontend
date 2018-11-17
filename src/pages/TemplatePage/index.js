import React from 'react';
import {withRouter} from 'react-router-dom';
import RenderedTemplate from './components/RenderedTemplate';
import Editor from './components/Editor';
import Loading from 'react-loading';
import {getTemplateById} from '../../data/Api';
class TemplatePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            htmlCode: ``,
            cssCode: ``
        }
        this.goBack = this.goBack.bind(this);
        this.setCode = this.setCode.bind(this);
    }

    componentWillMount() {
        getTemplateById(this.props.match.params.templateId)
            .then((res) => {
                this.setState({
                    htmlCode: res.template_html, 
                    cssCode: res.template_css,
                    name: res.template_name
                });
            })
            .catch(() => {
                this.props.history.push('/404')
            })
    }

    saveEditor() {
      console.log("I'm here");
    }

    downloadCode() {
      console.log("I'm downloaded");
    }

    setCode(prop, newValue) {
        this.setState({[prop]: newValue});
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        
        if (!this.state.htmlCode && !this.state.cssCode) {
            return (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <Loading type="spin" color='black' width="4rem"/>
                </div>
            )
        }

        return (
            <div className="w-100 h-100 px-0 container-fluid w-100 mx-0">
                <div className="row">
                    <span className="col-md-2">
                        <span className="text-primary" onClick={this.goBack}>
                            Back
                        </span>
                        <span className="ml-4">
                            {this.state.name}
                        </span>
                    </span>

                    <div className="col-md-8">
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary" onClick={this.saveEditor}>
                            Save
                        </button>
                        <button className="btn btn-primary ml-4" onClick={this.downloadCode}>
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
