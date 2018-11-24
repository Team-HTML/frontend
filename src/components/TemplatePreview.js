import React, { Component } from 'react'
import Loading from 'react-loading';

class TemplatePreview extends Component {

  render() {

    if (!this.props.html) {
      return (
        <div className="w-100 d-flex justify-content-center align-items-center template__frame-blur">
          <Loading type="spin" color='black' width="4rem" className="mt-5"/>
        </div>
      )
    }

    return (
        <iframe src={"data:text/html,"+encodeURIComponent(this.props.html)} className="w-100 template__frame">

        </iframe>
    )
  }
}

export default TemplatePreview