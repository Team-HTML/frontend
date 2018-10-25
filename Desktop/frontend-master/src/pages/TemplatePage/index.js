import React from 'react';
import HomePage from '../HomePage';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';
import RenderedTemplate from './components/RenderedTemplate';

class TemplatePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          code: `<html>
    <div>
        <marquee> Look it works!!!! </marquee>
    </div>
</html>`,
        }
        this.onChange = this.onChange.bind(this);
    }

    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();  
    }

    onChange(newValue, e) {
        this.setState({code: newValue});
    }

    render() {
        const code = this.state.code;

        const options = {
          selectOnLineNumbers: true
        };

        return (
            <div className="template container-fluid px-0">
                <div className="row h-100">
                    <div className="col-md-6 px-0">
                        <MonacoEditor
                            className="w-100 h-100"
                            language="html"
                            theme="vs-dark"
                            value={code}
                            options={options}
                            onChange={this.onChange}
                            editorDidMount={this.editorDidMount}
                        />
                    </div>
                        <div className="col-md-6 px-0">
                            <RenderedTemplate html={code} />
                        </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TemplatePage);