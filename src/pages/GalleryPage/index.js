import React from 'react';
import './newsfeed.component.css';
import GalleryTemplate from '../../components/GalleryTemplate';
import {getGallery} from '../../data/Api';
import Loading from "react-loading";

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
      const {public_templates} = this.state;

      if (!public_templates) return (
          <div className="mt-5">
            <h3 className="w-100 h-100 d-flex justify-content-center align-items-center text-white text-center pt-5">There are currently no gallery templates!</h3>
          </div>
      );

      return (
        <div className="row mt-4">
          {public_templates.map(d => {
            return (
              <div className="col-md-3">
                <GalleryTemplate {...d} />
              </div>
            );
          })}
        </div>
      );
  }

  /*renderDefaultTemplates() {
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
  }*/

  render() {
    const {public_templates} = this.state;
    if (!public_templates) {
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <Loading type="spin" color='black' width="4rem"/>
            </div>
        )
    }

    return (
      <div className="pt-5 home">
        <div className="container">
          <div className="row mx-0">
            <h1 className="home__name">Gallery</h1>
          </div>
         {/* <div className="templateContainer">*/}
          {this.renderPublicTemplates()}
          {/*</div>*/}
          {/*<div className="templateContainer">
            <h3>Default Designs</h3>
            {this.renderDefaultTemplates()}
      </div>*/}
        </div>
      </div>
    )
  }
}

export default GalleryPage;
