import React from 'react';
import {withRouter} from 'react-router-dom';
import RenderedTemplate from './components/RenderedTemplate';
import Editor from './components/Editor';
import Loading from 'react-loading';
import {getTemplateById, getHTMLFromS3, getCSSFromS3, uploadHTMLToS3, uploadCSSToS3} from '../../data/Api';
class TemplatePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            htmlCode: ``,
            cssCode: ``,
            htmlURL: ``,
            cssURL: ``
        }
        this.goBack = this.goBack.bind(this);
        this.setCode = this.setCode.bind(this);
        this.saveEditor = this.saveEditor.bind(this);
    }

    componentWillMount() {
        getTemplateById(this.props.match.params.templateId, this.props.user.user_id)
            .then((res) => {

                getHTMLFromS3(res.template_html)
                    .then(res2 => {

                        getCSSFromS3(res.template_css)
                            .then(res3 => {
                                this.setState({
                                    htmlCode: res2.text, 
                                    cssCode: res3.text,
                                    name: res.template_name,
                                    htmlURL: res.template_html,
                                    cssURL: res.template_css
                                });
                            })
                    })
            })
            .catch((e) => {
                console.log(e);
                this.props.history.push('/404')
            })
    }

    saveEditor() {
      uploadHTMLToS3(this.state.htmlCode, this.state.htmlURL)
        .then((r) => {
            uploadCSSToS3(this.state.cssCode, this.state.cssURL)
                .then(console.log)
                .catch(e => {
                    throw new Error(e);
                })
        })
        .catch(console.error)
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
                <div className="row template-page__nav">
                    <span className="col-md-2">
                        <span className="text-primary ml-4" onClick={this.goBack}>
                          <button className="btn-outline-light rounded m-1 mt-3">  Back </button>
                        </span>
                        <span className="ml-4 text-white">
                            {this.state.name}
                        </span>
                    </span>

                    <div className="col-md-8">
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-outline-light m-2" onClick={this.saveEditor}>
                            Save
                        </button>
                        <button className="btn btn-primary btn-outline-light ml-4 m-2" onClick={this.downloadCode}>
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
                        <RenderedTemplate html={this.state.htmlCode} css={this.state.cssCode}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TemplatePage);
