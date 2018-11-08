import React from 'react';

class RenderedTemplate extends React.Component {

  saveEditor() {
    console.log("I'm here");
  }

  downloadCode() {
    console.log("I'm downloaded");
  }

  goBack() {
    console.log("I'm going back");
  }

    render() {

        return (
            <div>
              <div className="template__footer">
                <button className="button" onClick={this.goBack}>
                  Back
                </button>
                <button className="button" onClick={this.saveEditor}>
                  Save
                </button>
                <button className="button" onClick={this.downloadCode}>
                  Download
                </button>
              </div>
              <div className="template container-fluid px-0" dangerouslySetInnerHTML={{__html: this.props.html}}>
              </div>
            </div>
        )
    }
}

export default RenderedTemplate;
