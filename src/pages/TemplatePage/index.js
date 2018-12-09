import React from 'react';
import {withRouter, Prompt, Link} from 'react-router-dom';
import RenderedTemplate from './components/RenderedTemplate';
import Editor from './components/Editor';
import Loading from 'react-loading';
import $ from 'jquery';

import {
    getTemplateById, 
    getHTMLFromS3, 
    getCSSFromS3, 
    uploadHTMLToS3, 
    uploadCSSToS3, 
    downloadProject,
    getRequest
} from '../../data/Api';
class TemplatePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            htmlCode: ``,
            cssCode: ``,
            htmlURL: ``,
            cssURL: ``,
            shouldSave: false
        }
        this.goBack = this.goBack.bind(this);
        this.setCode = this.setCode.bind(this);
        this.saveEditor = this.saveEditor.bind(this);
        this.downloadCode = this.downloadCode.bind(this);
    }

    componentWillMount() {
        getTemplateById(this.props.match.params.templateId, this.props.user.user_id)
            .then((res) => {

                getHTMLFromS3(res.template_html)
                    .then(res2 => {

                        getCSSFromS3(res.template_css)
                            .then(res3 => {
                                console.log(res3)
                                this.setState({
                                    htmlCode: res2.text, 
                                    cssCode: res3.text,
                                    name: res.template_name,
                                    htmlURL: res.template_html,
                                    cssURL: res.template_css,
                                    id: res.template_id
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
                .then(() => {
                    this.setState({shouldSave: false})
                })
                .catch(e => {

                    throw new Error(e);
                })
        })
        .catch(console.error)
    }

    downloadCode() {
      downloadProject(this.state.id)
        .then(({key}) => {
            //$('#downloader').attr('href', key);
            //$('#downloader').click()

            window.open(key)
        })
        .catch(console.error)
    }

    setCode(prop, newValue) {
        this.setState({[prop]: newValue, shouldSave: true});
    }

    goBack() {
       const {shouldSave} = this.state;

       if (shouldSave) {
           let b = window.confirm("You haven't saved your changes yet. Are you sure you want to leave?")
           if (b) {
                window.location = '/home'
           }
       }
       else {
           window.location = '/home'
       }
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
            <>
                <div className="w-100 px-0 container-fluid h-100 mx-0"> 
                    <div className="row template-page__nav">
                        <div className="col-md-1">
                            <a className="d-none" id="downloader" target="_blank"></a>

                            <div className="text-primary ml-4" onClick={this.goBack}>
                                <button className="btn-outline-light rounded m-1 mt-3">  Back </button>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="ml-4 mt-3 text-white">
                                {this.state.name}
                            </div>
                        </div>

                        <div className="col-md-6">
                        </div>
                        <div className="col-md-2 text-right">
                            <button className="btn btn-outline-light m-2" onClick={this.saveEditor}>
                                Save
                            </button>
                        </div>
                        <div className="col-md-2 text-white">
                            <a className="btn btn-primary btn-outline-light m-2 text-white" onClick={this.downloadCode}>
                                Download
                            </a>
                        </div>
                    </div>
                    <div className="w-100 row mx-0" style={{height: '87%'}}>
                        <div className="col-md-6 px-0">
                            <div className="container w-100 h-100 px-0">
                                <Editor setCode={this.setCode} {...this.state} />
                            </div>
                        </div>
                        <div className="col-md-6 px-0" style={{height: '108%'}}>
                            <RenderedTemplate html={this.state.htmlCode} css={this.state.cssCode}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(TemplatePage);
