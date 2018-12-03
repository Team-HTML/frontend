import {Route, Redirect} from 'react-router-dom';
import React from 'react';

class LandingRoute extends React.Component {
    
    render() {
        console.log(this.props);

        return (

            <Route path={this.props.path} render={props => (
                !this.props.authenticated ? (
                    <this.props.component {...props} user={this.props.user} />
                ) : (
                    <Redirect to={{
                        pathname: '/home',
                        state: {from: props.location}
                    }} />
                )
            )} />
        )
    }
}

export default LandingRoute;