import React from 'react';
import {Link} from 'react-router-dom';
import {GoogleLogout} from 'react-google-login';



class Navbar extends React.Component {

    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this)
    }

    logout(response) {
      this.props.setUser(null)
    }

    render() {
        return (
          <nav className="navbar navbar-expand-lg b-nav">
            <div className="container px-0">
              <Link to="/home"><img src="/logo.png" className="b-nav__logo"/></Link>
              {/*<a className="navbar-brand" href="/home"><img src="/logo.png" className="b-nav__logo"/></a>*/}
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav ml-5">
                  <li className="nav-item b-nav__item px-3">
                    <a className="nav-link b-nav__link" href="/home">Home</a>
                  </li>
                  <li className="nav-item b-nav__item px-3 mr-4">
                    <Link className="nav-link b-nav__link" to="/gallery">Gallery</Link>
                  </li>
                </ul>
              </div>
              <div>
                <button
                  onClick={this.logout}
                  className="btn red-bg text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        );
    }
}

export default Navbar;
