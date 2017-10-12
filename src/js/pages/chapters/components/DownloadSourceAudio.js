import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'

class DownloadTR extends Component {
    download() {
        this.props.onDownloadSourceAudio();
    }

    render() {
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

export default DownloadTR;
