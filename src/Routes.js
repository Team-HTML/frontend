import {Switch, Route} from 'react-router-dom';
import React from 'react';
import {withRouter} from 'react-router-dom';
import DesktopPage from './pages/DesktopPage';
import LandingPage from './pages/LandingPage';
import FolderPage from './pages/FolderPage';
import TemplatePage from './pages/TemplatePage';
import GalleryPage from './pages/GalleryPage';
import NotFoundPage from './pages/NotFoundPage';

import Layout from './layouts/Layout';
import LayoutMain from './layouts/LayoutMain';
import Loading from 'react-loading';

import PrivateRoute from './PrivateRoute';
//import LandingPage from './LandingRoute';

import {verifyToken} from './data/Api';
import LandingRoute from './LandingRoute';

class Routes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            authenticated: null
        }

        this.setUser = this.setUser.bind(this);
    }

    componentWillMount() {

        const {userId, token} = localStorage

        if(!userId || !token) {
            this.setState({authenticated: false})
            return;
        }

        verifyToken(userId, token)
            .then(user => {
                this.setState({
                    user,
                    authenticated: true
                })
            })
            .catch(e => {
                delete localStorage['token']
                delete localStorage['userId']
                this.setState({authenticated: false})
            })
    }

    withLayout(Child) {
        return (props) => (
            <Layout setUser={this.setUser}>
                <Child {...props}/>
            </Layout>
        )
    }

    setUser(u) {
        this.setState({
            user: u,
            authenticated: true
        })
        localStorage.setItem('token', u['token'])
        localStorage.setItem('userId', u['user_id'])
        this.props.history.push('/home')
    }

    withLayoutMain(Child) {
        return (props) => (
            <LayoutMain setUser={this.setUser}>
                <Child />
            </LayoutMain>
        )
    }

    render() {
        
        if (this.state.authenticated === null) {
            return (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <Loading type="spin" color='black' width="4rem"/>
                </div>
            )
        }

        return  (
            <Switch>
                <LandingRoute exact path="/" {...this.state} component={this.withLayoutMain(LandingPage)}/>
                <PrivateRoute exact path="/home" {...this.state} component={this.withLayout(DesktopPage)}/>
                <Route exact path="/gallery" component={this.withLayout(GalleryPage)}/>
                <PrivateRoute exact path="/folder/:folderId" {...this.state} component={this.withLayout(FolderPage)}/>
                <PrivateRoute exact path="/template/:templateId" {...this.state} component={TemplatePage} />
                <Route path="/" component={this.withLayout(NotFoundPage)}/>
            </Switch>
        )
    }
}

export default withRouter(Routes);
