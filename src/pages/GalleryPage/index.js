import React from 'react';
import './newsfeed.component.css';
import Template from '../../components/Template';

class GalleryPage extends React.Component {
  renderPublicTemplates() {
      const publicTemplates = [
          {
              name: 'Public 1',
              templateId: 1
          },
          {
              name: 'Public 2',
              templateId: 2
          },
          {
              name: 'Public 3',
              templateId: 3
          },
          {
              name: 'Public 4',
              templateId: 3
        },
      ];
            
      return (
        <div className="row mt-5">
          {publicTemplates.map(d => {
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
    const defaultTemplates = [
        {
            name: 'Default 1',
            templateId: 1
        },
        {
            name: 'Default 2',
            templateId: 2
        },
        {
            name: 'Default 3',
            templateId: 3
        },
        {
            name: 'Default 4',
            templateId: 3
      },
    ];
          
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
