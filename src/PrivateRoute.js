import {Route, Redirect} from 'react-router-dom';
import React from 'react';

class PrivateRoute extends React.Component {
    
    render() {
        return (
            <Route path={this.props.path} render={props => (
                this.props.authenticated ? (
                    <this.props.component {...props} user={this.props.user} />
                ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: {from: props.location}
                    }} />
                )
            )} />
        )
    }
}

export default PrivateRoute;