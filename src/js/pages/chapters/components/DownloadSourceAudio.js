import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import config from 'config/config'
import axios from 'axios'

let state;
let handleOpen;
let handleClose;
let disable;
let parameters;
let projID;



class DownloadTR extends Component{

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       downloadLoading: false
    //     };
    // }

    download(){
        this.props.onDownloadSourceAudio();
    }


        render() {
            // projID = this.props.project_id;
            let publishButton =
                <Button
                    floated="right"
                    color={"blue"}
                    disabled={this.props.downloadLoadingSourceAudio}//enable if published is disabled
                    loading={this.props.downloadLoadingSourceAudio}
                    onClick={this.download.bind(this)}
                >
                    {this.props.displayText.downloadSrcAudio}
                </Button>

            if (this.props.isPublish) {
                return publishButton;
            } else {
                return null;
            }
    }
}


const mapStateToProps = state => {

const{ displayText } = state.geolocation;

return{displayText};

};


export default connect (mapStateToProps) (DownloadTR);
