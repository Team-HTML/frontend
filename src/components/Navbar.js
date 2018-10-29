import React from 'react';
import {Link} from 'react-router-dom';
import {GoogleLogout} from 'react-google-login';

  //send to backend...?
  const logout = (response) => {
    console.log("logged out!");
  }

class Navbar extends React.Component {

    render() {
        return (
          <nav className="navbar navbar-expand-lg b-nav">
            <div className="container px-0">
              <a className="navbar-brand" href="/home"><img src="/white.png" className="b-nav__logo"/></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-5">
                  <li className="nav-item b-nav__item">
                    <Link className="nav-link b-nav__link" to="/newsfeed">Newsfeed</Link>
                  </li>
                </ul>
              </div>
              <div>
                <GoogleLogout
                  buttonText="Logout"
                  onLogoutSuccess={logout}
                >
                </GoogleLogout>
              </div>
            </div>
          </nav>
        );
    }
}

export default Navbar;
