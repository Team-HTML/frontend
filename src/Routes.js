import {Switch, Route} from 'react-router-dom';
import React from 'react';
import {withRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';

class Routes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  (
            <Switch>
                <Route exact path="/" component={HomePage}/>
            </Switch>
        )
    }
}

export default withRouter(Routes);