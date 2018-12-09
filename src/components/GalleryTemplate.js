import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import GalleryPreview from './GalleryPreview';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import {downloadProject} from '../data/Api';

class GalleryTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
        }

        this.download = this.download.bind(this);
    }

    showPreview() {
        this.setState({ previewVisible: true });
    }
 
    hidePreview() {
        this.setState({ previewVisible: false });
    }

    download() {
        downloadProject(this.props.template_id)
        .then(({key}) => {
            //$('#downloader').attr('href', key);
            //$('#downloader').click()

            window.open(key)
        })
        .catch(console.error)
    }

    render() {
        return (
            <div className={((this.props.template_html) ? "" : "template__blur " ) + "template shadow mb-4"} >
                <div onClick={this.showPreview.bind(this)}>
                <GalleryPreview html={this.props.template_html} />
                </div>
                
                <div className="d-flex p-2">
                    <div className="text-md-left col-md-6 mt-2 ml-2">
                        <div onClick={this.showPreview.bind(this)} className="gallery__template">
                            {this.props.template_name}
                            <span className="gallery__templatename">{this.props.template_name}</span>
                            </div>
                        <Rodal 
                                visible={this.state.previewVisible} 
                                onClose={this.hidePreview.bind(this)} 
                                animation="door"
                                width={600}
                                height={275}
                                customStyles={{borderRadius: 20}}
                            >
                                <iframe src={this.props.template_html} className="w-100 template__frame__popup h-100 w-100">

                                </iframe>
                            </Rodal>
                    </div>  
                    <div className="btn btn-outline-primary text-md-right" onClick={this.download}>
                        Download
                        <a className="d-none" id="downloader" target="_blank"></a>
                    </div>  
                </div>            
            </div>
        );
    }
}

export default withRouter(GalleryTemplate);
