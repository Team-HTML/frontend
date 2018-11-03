import React from 'react';
import Folder from '../../components/Folder';

class DesktopPage extends React.Component {

    renderFolders() {
        const data = [
            {
                name: 'Folder 1',
                folderId: 1
            },
            {
                name: 'Folder 2',
                folderId: 2
            },
            {
                name: 'Folder 3', 
                folderId: 3
            },
            {
                name: 'Folder 4',
                folderId: 4
            }
        ]

        data.unshift({name: 'Default', folderId: 0})

        return (
            <div className="row">
                {data.map(d => {
                    return (
                        <div className="col-md-3">
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
                    <div className="row mx-0">
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

export default DesktopPage;