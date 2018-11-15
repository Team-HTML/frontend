import React from 'react';
import {Switch, Route} from 'react-router-dom';

class NotFoundPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container pt-5">
                        <div className="notfound_errorcode">
                            <h1 className="justify-content-center d-flex p-3">404</h1>
                            <h3 className="justify-content-center d-flex p-3">Page Not Found!</h3>
                            <p> Looks like the page you are looking for doesn't have a blueprint...big yikes...</p>
                        </div>
                </div>
            </div>
        )
    }
}

export default NotFoundPage;