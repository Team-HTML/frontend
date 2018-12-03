import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import GalleryPreview from './GalleryPreview';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

class GalleryTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
        }
    }

    showPreview() {
        this.setState({ previewVisible: true });
    }
 
    hidePreview() {
        this.setState({ previewVisible: false });
    }

    render() {
        return (
            <div className={((this.props.template_html) ? "" : "template__blur " ) + "template shadow mb-4"}>
                <GalleryPreview html={this.props.template_html} />
                
                <div className="d-flex p-2">
                    <div className="text-md-left mt-2 ml-2">
                        <div onClick={this.showPreview.bind(this)}>{this.props.template_name}</div>
                        <Rodal 
                                visible={this.state.previewVisible} 
                                onClose={this.hidePreview.bind(this)} 
                                animation="door"
                                width="600"
                                height="275"
                                customStyles={{borderRadius: 20}}
                            >
                                <iframe src={this.props.template_html} className="w-100 template__frame">

                                </iframe>
                            </Rodal>
                    </div>  
                    <div className="btn btn-outline-primary ml-5 text-md-right">Download</div>  
                </div>            
            </div>
        );
    }
}

export default withRouter(GalleryTemplate);
