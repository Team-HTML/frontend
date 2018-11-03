import React from 'react';
import MonacoEditor from 'react-monaco-editor';

class CSSEditor extends React.Component {
    constructor(props) {
        super(props);
        const editor = null;
        this.onChange = this.onChange.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
    }

    editorDidMount(editor, monaco) {
        this.editor = editor;
        editor.focus();  
    }

    onChange(newValue, e) {
        this.props.setCode('cssCode', newValue);
    }

    componentDidMount() {
		window.addEventListener('resize', this.handleResize);      
    }

    handleResize = () => this.editor.layout();

    render() {
        const code = this.props.cssCode;

        const options = {
            selectOnLineNumbers: true
        };

        return (
            <div style={this.props.toShow} className="h-100">
                <MonacoEditor
                    language="css"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
            </div>
        );
    }
}

export default CSSEditor;