import React from 'react';
import CodeEditor from './CodeEditor';
import EditorTab from './EditorTab';

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currTab: 1,
            tabs: [
                {
                    file: 'index.html',
                    default: props.htmlCode,
                    lang: 'html'

                },
                {
                    file: 'style.css',
                    default: props.cssCode,
                    lang: 'css'
                }
            ]
        }

        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(newTab) {
        this.setState({currTab: newTab});
    }

    renderTabs(tabs, currTab) {
        return (
            <div className="row no-gutters tabs">
                {tabs.map((tab, i) => <EditorTab
                    {...tab}
                    isActive={i === currTab}
                    key={i}
                    idx={i}
                    changeTab={this.changeTab}
                />)}
            </div>
        );
    }

    render() {
        const {tabs, currTab} = this.state;
        const {setCode} = this.props;

        return (
            <>
                {this.renderTabs(tabs, currTab)}
                <CodeEditor
                    tabs={tabs}
                    setCode={setCode}
                    currTab={currTab}
                />
            </>
        );
    }
}

export default Editor;
