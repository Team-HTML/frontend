import React from 'react';
import './newsfeed.component.css';
import Folder from '../../components/Folder';

class NewsFeedPage extends React.Component {
  renderTemplates() {
      const data = [
          {
              name: 'Template 1'
          },
          {
              name: 'Template 2'
          },
          {
              name: 'Template 3'
          }
      ]

      return (
          <div className="row">
              {data.map(d => {
                  return (
                      <div className="col-md-3 templateRow">
                          <Folder {...d} />
                          <p>name: public </p>
                      </div>
                  );
              })}
          </div>
      );
  }
  render() {
    return (
      <div>
        <div className="title">
          <h1>NewsFeed</h1>
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

export default NewsFeedPage;
