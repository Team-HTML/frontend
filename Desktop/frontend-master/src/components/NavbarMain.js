import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

//send to backend
const successResponseGoogle = (response) => {
  console.log(response);
}

//possibly send an error message and redirect back to main page
const failResponseGoogle = (response) => {
  console.log(response);
}

//send to backend
const responseFacebook = (response) => {
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
                      clientId={'1022533524729-76c3ttk1phql7eplo5mf78uc0nd7tsvb.apps.googleusercontent.com'}
                      buttonText = "Login"
                      onSuccess={successResponseGoogle}
                      onFailure={failResponseGoogle}
                    >
                    </GoogleLogin>
                  </li>
                    <FacebookLogin
                      appId="766618927015521"
                      autoLoad
                      callback={responseFacebook}
                      render={renderProps => (
                        <button onClick={renderProps.onClick}>This is my custom FB button</button>
                      )}>
                    </FacebookLogin>
                  <li>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}

export default NavbarMain;