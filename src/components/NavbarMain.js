import React from 'react';
import GoogleLogin from 'react-google-login';
//import GoogleLoginButton from 'react-google-login-button'
import {login} from '../data/Api';
import {withRouter} from 'react-router-dom';

class NavbarMain extends React.Component {

  successResponseGoogle = (response) => {
    login({"user_id" : 333, "user_first_name" : "bob", "user_last_name" : "lll", "user_email": response.getBasicProfile().getEmail()})
      .then(r => {
        console.log(r);
      })
    this.props.history.push('/home')
    //console.log({email: response.getBasicProfile().getEmail()});
  }

  failResponseGoogle = (response) => {
    console.log(response);
  
  }

    render() {
        return (
          <nav className="navbar navbar-expand-lg b-nav">
            <div className="container px-0">
              <a className="navbar-brand" href="/"><img src="/white.png" className="main_nav__logo"/></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav ml-5">
                  <li className="nav-item main_nav__item p-3">
                    <div className="btn btn-primary">
                      <GoogleLogin
                        className="text-white"
                        clientId="514487700487-gasef328acuesh2okt5i9hnr4a4lt1pc.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.successResponseGoogle}
                        onFailure={this.failResponseGoogle}
                      >
                      Log in with Google
                      </GoogleLogin>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}

export default withRouter(NavbarMain);