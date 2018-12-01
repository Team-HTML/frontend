import React from 'react';
import './newsfeed.component.css';
import Template from '../../components/Template';
import {getGallery} from '../../data/Api';

class GalleryPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getGallery()
      .then(res => {
        this.setState(res);
      })
      .catch(console.error)
  }


  renderPublicTemplates() {
      const {public_templates} = this.state
            
      if (!public_templates) return;

      return (
        <div className="row mt-5">
          {public_templates.map(d => {
            return (
              <div className="col-md-3">
                <Template {...d} />
              </div>
            );
          })}
        </div>
      );
  }

  renderDefaultTemplates() {
    const defaultTemplates = [];
          
    return (
      <div className="row mt-5">
        {defaultTemplates.map(d => {
          return (
            <div className="col-md-3">
              <Template {...d} />
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="title">
          <h1>Gallery</h1>
        </div>
        <div className="templateContainer">
          <h3>Public Templates </h3>
          {this.renderPublicTemplates()}
        </div>
        <div className="templateContainer">
          <h3>Default Designs</h3>
          {this.renderDefaultTemplates()}
        </div>
      </div>
    )
  }
}

export default GalleryPage;
