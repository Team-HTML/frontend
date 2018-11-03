import React from 'react';
import HTMLEditor from './HTMLEditor';
import CSSEditor from './CSSEditor';
import CodeEditor from './CodeEditor';
import EditorTab from './EditorTab';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currTab: 0,
            tabs: [
                {
                    file: 'index.html', 
                    default: `<html>
    <div>
        <marquee> Look it works!!!! </marquee>
    </div>
</html>`,
                    lang: 'html'
                    
                },
                {
                    file: 'style.css',
                    default: `.blue {
    color: bluefiowjioefoi;
}`,
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
        const CurrentEditor = tabs[currTab].component;
        const {htmlCode, cssCode, setCode} = this.props;

        return (
            <>
                {this.renderTabs(tabs, currTab)}
                <CodeEditor
                    tabs={tabs}                         
                    htmlCode={htmlCode} 
                    cssCode={cssCode} 
                    setCode={setCode}
                    currTab={currTab}
                />
            </>
        );
    }
}

export default Editor;