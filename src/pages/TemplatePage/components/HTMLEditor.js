import React from 'react';
import MonacoEditor from 'react-monaco-editor';

class HTMLEditor extends React.Component {

    constructor(props) {
        super(props);
        this.editor = null;
        this.onChange = this.onChange.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
    }

    editorDidMount(editor, monaco) {
        this.editor = editor;
        monaco.editor.createModel('hi', 'html', new monaco.Uri().with({path: 'hi.html'}));
        console.log(monaco.editor.getModels());
        editor.focus();  
    }

    componentDidMount() {
		window.addEventListener('resize', this.handleResize);      
    }

    handleResize = () => this.editor.layout();

    onChange(newValue, e) {
        this.props.setCode('htmlCode', newValue);
    }

    render() {
        const code = this.props.htmlCode;

        const options = {
            selectOnLineNumbers: true
        };

        return (
                <MonacoEditor
                    language="html"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
        );
    }
}

export default HTMLEditor;