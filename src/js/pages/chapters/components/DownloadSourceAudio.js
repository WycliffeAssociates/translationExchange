/**
 * Created by DennisMarchuk on 7/27/2017.
 */

import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import config from 'config/config'
import axios from 'axios'

let state;
let handleOpen;
let handleClose;
let disable;
let parameters;
let projID;



export default class DownloadTR extends Component{

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
                    Download Source Audio
                </Button>

            if (this.props.isPublish) {
                return publishButton;
            } else {
                return null;
            }
    }
}