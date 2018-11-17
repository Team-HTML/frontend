import React from 'react';
import MonacoEditor from 'react-monaco-editor';

class CodeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.editor = null;
        this.monaco = null;
        this.onChange = this.onChange.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
    }

    editorDidMount(editor, monaco) {
        this.editor = editor;
        this.monaco = monaco;
        this.props.tabs.forEach((t) => {
            if (!monaco.editor.getModel(t.file)) {
                monaco.editor.createModel(t.default, t.lang, new monaco.Uri().with({path: t.file}));
            }
            else {
                console.log(monaco.editor.getModel(t.file))
            }
        })
        
        this.editor.setModel(monaco.editor.getModels()[this.props.currTab + 1]);
        editor.focus();  
    }


    componentDidUpdate() {
        this.editor.setModel(this.monaco.editor.getModels()[this.props.currTab]);
        this.editor.focus();  
    }

    componentDidMount() {
		window.addEventListener('resize', this.handleResize);      
    }

    componentWillUnmount() {
        this.editor && this.editor.dispose();
    }

    handleResize = () => this.editor.layout();

    onChange(newValue, e) {
        const {language} = this.editor.getModel()._languageIdentifier;

        if (language === 'html') this.props.setCode('htmlCode', newValue);
    }

    render() {
        const options = {
            selectOnLineNumbers: true
        };

        return (
                <MonacoEditor
                    theme="vs-dark"
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
        );
    }
}

export default CodeEditor;