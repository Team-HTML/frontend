import React from 'react';
import Folder from '../../components/Folder';
import Popup from "reactjs-popup";
import ReactDropzone from "react-dropzone";
import Template from '../../components/Template';

class DesktopPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            folders: [
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
            ],
            defaultFolder: [

            ],
            uploadedFile: null,
            addFolder: '',
            open: false
        }

        this.uploadTemplate = this.uploadTemplate.bind(this);
        this.updateAddFolder = this.updateAddFolder.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }


    openModal (){
        this.setState({ open: true })
    }
    closeModal () {
        this.setState({ open: false })
    }


    renderFolders() {
        const {folders} = this.state;

        return (
            <div className="row">
                {folders.map(d => {
                    return (
                        <div className="col-md-3">
                            <Folder {...d} />
                        </div>
                    );
                })}
            </div>
        );
    }

    renderAddFolder() {
      const {newFolder} = this.state;

      return (
        <div className="row">
              <div className="col-md-3">
                  <div className="box box__add my-3 text-center vertical-center"
                  onClick={this.openModal}>
                    +
                  </div>
              </div>
        </div>
      );
    }

    renderDefaultFolder() {

        const {defaultFolder} = this.state;

        return (
            <div className="row">
                {defaultFolder.map(d => {
                    console.log(d);
                    return (
                        <div className="col-md-3">
                            <Template {...d} />
                        </div>
                    );
                })}
            </div>
        );
    }

    onDrop(a) {
        console.log(a)
        this.setState({uploadedFile: a[0]});
    }

    uploadTemplate() {
        const {uploadedFile, defaultFolder} = this.state;

        this.setState({defaultFolder: [...defaultFolder, {name: uploadedFile.name}]})
    }

    updateAddFolder(evt) {
      this.setState({
        addFolder: evt.target.value
      });
    }

    createFolder() {
        const {addFolder, folders} = this.state;
        console.log(addFolder);

        this.setState({
          addFolder: '',
          folders: [...folders, {name: addFolder, folderId: 5}]
        }
      )

        this.closeModal();
        return(
          <p> {this.renderFolders()} </p>
        );
    }

    render() {
        return (
            <div className="home mt-5">
                <div className="container">
                    <div className="row mx-0">
                        <h1>Library</h1>
                        <Popup
                            trigger={<button className="btn rounded-circle btn-primary home__upload"><span style={{transform: 'translateY(-2.5rem)'}}>+</span></button>}
                            modal
                            closeOnDocumentClick
                            >
                            <p> Choose a template to upload: </p>
                            <ReactDropzone
                                className="d-flex container justify-content-center"
                                onDrop={this.onDrop}
                                >
                                <div className="border">
                                    Pick a file here
                                </div>
                            </ReactDropzone>
                            <div className="ml-5">
                                <div className="btn btn-primary" onClick={this.uploadTemplate}>Submit</div>
                            </div>
                        </Popup>
                        <Popup
                          open={this.state.open}
                          closeOnDocumentClick
                          onClose={this.closeModal}
                          >
                            <div className="d-flex container justify-content-center">
                              <h3> Please enter name of folder below </h3>
                            </div>
                            <div className="d-flex container justify-content-center">
                              <input type="text" value={this.state.addFolder}
                              onChange={(evt) => this.updateAddFolder(evt)} />
                            </div>
                            <div className="d-flex container justify-content-center">
                              <button onClick={this.createFolder}> Create </button>
                            </div>
                        </Popup>
                        <div className="ml-auto home__sort mt-1">
                            Sort
                        </div>
                    </div>
                    {this.renderFolders()}
                    {this.renderAddFolder()}
                    {this.renderDefaultFolder()}
                </div>
            </div>
        )
    }
}

export default DesktopPage;
