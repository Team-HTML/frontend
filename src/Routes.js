import {Switch, Route} from 'react-router-dom';
import React from 'react';
import {withRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import FolderPage from './pages/FolderPage';
import TemplatePage from './pages/TemplatePage';

import Layout from './layouts/Layout';
import LayoutMain from './layouts/LayoutMain';


class Routes extends React.Component {

    constructor(props) {
        super(props);
    }

    withLayout(Child) {
        return (props) => (
            <Layout>
                <Child />
            </Layout>
        )
    }

    withLayoutMain(Child) {
        return (props) => (
            <LayoutMain>
                <Child />
            </LayoutMain>
        )
    }

    render() {
        return  (
            <Switch>
                <Route exact path="/" component={this.withLayoutMain(MainPage)}/>
                <Route exact path="/home" component={this.withLayout(HomePage)}/>
                <Route exact path="/folder/:folderId" component={this.withLayout(FolderPage)}/>
                <Route exact path="/template/:templateId" component={TemplatePage} />
            </Switch>
        )
    }
}

export default withRouter(Routes);