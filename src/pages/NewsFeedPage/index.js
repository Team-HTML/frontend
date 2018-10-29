import React from 'react';
import './newsfeed.component.css';
import Template from '../../components/Template';
import RenderedTemplate from '../TemplatePage/components/RenderedTemplate';

class NewsFeedPage extends React.Component {
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
          }
      ]

      return (
          <div className="row">
              {data.map(d => {
                  return (
                      <div className="col-md-3 templateRow">
                          <Template {...d} />
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
