import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class DownloadTR extends Component {
    download() {
        this.props.onDownloadSourceAudio();
    }

    render() {
        if (this.props.published === "true") {
            return (<Button
                floated="right"
                color={"blue"}
                disabled={false}//enable if published is disabled
                loading={this.props.downloadLoadingSourceAudio}
                onClick={this.download.bind(this)}>
                {this.props.displayText.downloadSrcAudio}
            </Button>)
        } else {
            return (<Button
                floated="right"
                color={"blue"}
                disabled={true}//enable if published is disabled
                loading={this.props.downloadLoadingSourceAudio}
                onClick={this.download.bind(this)}>
                {this.props.displayText.downloadSrcAudio}
            </Button>)
        }
    }
}

export default DownloadTR;
