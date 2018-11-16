import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

class NotFoundPage extends React.Component {
    render() {
        var home = <Link to="/home">here</Link>
        return (
            <div>
                {/*<div className="container pt-5">
                        <div className="notfound_errorcode">
                            <h1 className="justify-content-center d-flex p-3">404</h1>
                            <h3 className="justify-content-center d-flex p-3">Page Not Found!</h3>
                            <p> Looks like the page you are looking for doesn't have a blueprint...big yikes...</p>
                        </div>
                </div>*/}
                <div className="container mt-5 pt-5">
                    <div className="justify-content-center d-flex"> <img src="/404ErrorPage.jpg"/></div>
                    <h3 className="justify-content-center d-flex p-3">Ready to stop making the same face? Click&nbsp;{home}&nbsp;to go to your home page.</h3>
                </div>
            </div>
        )
    }
}

export default NotFoundPage;