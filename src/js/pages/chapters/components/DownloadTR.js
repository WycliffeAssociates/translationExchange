/**
 * Created by DennisMarchuk on 7/27/2017.
 */

import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import config from 'config/config'
import axios from 'axios'


let projID ;
export default class DownloadTR extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            downloadLoading: false
        };
    }

    download() {
        this.setState({ downloadLoading: true });
        let parameters = { "project": projID };
        axios.post(config.apiUrl + 'get_source/', parameters, { timeout: 0 })
            .then((response) => {
                window.location = config.streamingUrl + response.data.location;
                this.setState({ downloadLoading: false });
            }).catch((exception) => {
                console.log(exception);
            });
    }


    render() {
        projID = this.props.project_id;
        let publishButton =
            <Button
                floated="right"
                color={"blue"}
                disabled={this.state.downloadLoading}//enable if published is disabled
                loading={this.state.downloadLoading}
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