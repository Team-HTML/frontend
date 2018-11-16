import React, { Component } from 'react'
import { createPortal } from 'react-dom'

class TemplatePreview extends Component {

  render() {
    return (
        <iframe src={"data:text/html,"+encodeURIComponent(this.props.html)} className="w-100 template__frame">

        </iframe>
    )
  }
}

export default TemplatePreview