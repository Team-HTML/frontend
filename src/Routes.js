import {Switch, Route} from 'react-router-dom';
import React from 'react';
import {withRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';

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

    render() {
        return  (
            <Switch>
                <Route exact path="/home" component={this.withLayout(HomePage)}/>
                <Route exact path="/folder/:folderId" component={this.withLayout(HomePage)}/>
            </Switch>
        )
    }
}

export default withRouter(Routes);