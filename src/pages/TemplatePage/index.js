import React from 'react';
import HomePage from '../HomePage';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';


class TemplatePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          code: '// type your code...',
        }
    }

    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();  
    }

    onChange(newValue, e) {
    console.log('onChange', newValue, e);
    }

    render() {
        const code = this.state.code;

        const options = {
          selectOnLineNumbers: true
        };

        return (
            <div className="template container-fluid px-0">
                <div className="col-md-6 h-100 px-0">
                    <MonacoEditor
                        width="100%"
                        height="80%"
                        language="html"
                        theme="vs-dark"
                        value={code}
                        options={options}
                        onChange={this.onChange}
                        editorDidMount={this.editorDidMount}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(TemplatePage);