import React from 'react';
import GoogleLogin from 'react-google-login';
//import GoogleLoginButton from 'react-google-login-button'
import {login} from '../data/Api';
import {withRouter, Link} from 'react-router-dom';

class NavbarMain extends React.Component {

  successResponseGoogle = (response) => {
    login({"user_first_name" : response.profileObj.givenName, "user_last_name" : response.profileObj.familyName, "user_email": response.getBasicProfile().getEmail()})
      .then(r => {
        this.props.setUser(r);
      })
    //console.log({email: response.getBasicProfile().getEmail()});
  }

  failResponseGoogle = (response) => {
    console.log(response);
  
  }

    render() {
        return (
          <nav className="navbar navbar-expand-lg main_nav">
            <div className="container px-0">
                <a className="navbar-brand" href="/"><img src="/logo.png" className="main_nav__logo"/></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
                <ul className="navbar-nav ml-5">
                  <li className="nav-item main_nav__item p-3">
                    <div className="gg_login">
                      <GoogleLogin
                        className="login_btn btn btn-light"
                        clientId="514487700487-gasef328acuesh2okt5i9hnr4a4lt1pc.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.successResponseGoogle}
                        onFailure={this.failResponseGoogle}
                      >
                      <img src="/btn_google.png" className="login_img"/>
                      </GoogleLogin>
                    </div>
                  </li>
                </ul>
            </div>
          </nav>
        );
    }
}

export default withRouter(NavbarMain);