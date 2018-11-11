import React from 'react';
import './newsfeed.component.css';
import Template from '../../components/Template';

class GalleryPage extends React.Component {
  renderTemplates() {
      const data = [
          {
              name: 'Template 4',
              templateId: 4
          },
          {
              name: 'Template 5',
              templateId: 5
          },
          {
              name: 'Template 6',
              templateId: 6
          },
          {
            name: 'Template 686',
            templateId: 6
          },
          {
            name: 'GURGHERIGHEI',
            templateId: 676
          }
      ]

      return (
        <div className="container">
          <div className="row">
              {data.map(d => {
                  return (
                      <div className="col-md-3">
                          <Template {...d} />
                          <p>{d.name} </p>
                      </div>
                  );
              })}
          </div>
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
          {this.renderTemplates()}
        </div>
        <div className="templateContainer">
          <h3>Pre-designed Templates </h3>
          {this.renderTemplates()}
        </div>
      </div>
    )
  }
}

export default GalleryPage;
