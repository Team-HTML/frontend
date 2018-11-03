import React from 'react';

class EditorTab extends React.Component {

    constructor(props) {
        super(props);
        this.onClickTab = this.onClickTab.bind(this);
    }

    onClickTab() {
        this.props.changeTab(this.props.idx);
    }

    render() {
        const {isActive} = this.props;
        return (
            <>
                <div className={(isActive ? 'tabs__tab-active' : '' ) + ' tabs__tab'} onClick={this.onClickTab}>
                    {this.props.file}
                </div>
            </>
        );
    }
}

export default EditorTab;