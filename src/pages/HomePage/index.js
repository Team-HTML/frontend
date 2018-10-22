import React from 'react';
import Folder from '../../components/Folder';

class HomePage extends React.Component {

    renderFolders() {
        const data = [
            {
                name: 'Folder 1'
            },
            {
                name: 'Folder 2'
            },
            {
                name: 'Folder 3'
            },
            {
                name: 'Folder 4'
            }
        ]

        data.unshift({name: 'Default'})

        data.push({name: '+'})

        return (
            <div className="row">
                {data.map(d => {
                    return (
                        <div className="col-3">
                            <Folder {...d} />
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="home mt-5">
                <div className="container">
                    <div className="row">
                        <h1>Library</h1>
                        <div className="ml-auto home__sort mt-1">
                            Sort 
                        </div>
                    </div>
                    {this.renderFolders()}
                </div>
            </div>
        )
    }
}

export default HomePage;
