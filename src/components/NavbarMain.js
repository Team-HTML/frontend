import React from 'react';
import GoogleLogin from 'react-google-login';
//import GoogleLoginButton from 'react-google-login-button'
import {login} from '../data/Api';

//send to backend
const successResponseGoogle = (response) => {
  /*login({email: response.getBasicProfile().getEmail()})
    .then(r => {
      console.log(r);
    })/*
    console.log({email: response.getBasicProfile().getEmail()});
}

//possibly send an error message and redirect back to main page
const failResponseGoogle = (response) => {
  console.log(response);
}

class NavbarMain extends React.Component {

    render() {
        return (
          <nav className="navbar navbar-expand-lg b-nav">
            <div className="container px-0">
              <a className="navbar-brand" href="/"><img src="/white.png" className="b-nav__logo"/></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav ml-5">
                  <li className="nav-item b-nav__item p-3">
                    <GoogleLogin
                      clientId="514487700487-gasef328acuesh2okt5i9hnr4a4lt1pc.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={successResponseGoogle}
                      onFailure={failResponseGoogle}
                    >
                    </GoogleLogin>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}

export default NavbarMain;