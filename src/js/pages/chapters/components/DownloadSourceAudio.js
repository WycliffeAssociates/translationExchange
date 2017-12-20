import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class DownloadTR extends Component {
    download() {
        this.props.onDownloadSourceAudio();
    }
    enableDisableDownloadSourceAudioButton(published) {
        return <Button
            floated="right"
            color={"blue"}
            disabled={!(published === "true" ? true : false)}//enable if published is disabled
            loading={this.props.downloadLoadingSourceAudio}
            onClick={this.download.bind(this)}>
            {this.props.displayText.downloadSrcAudio}
        </Button>
    }
    render() {
        return this.enableDisableDownloadSourceAudioButton(this.props.published)
    }
}

export default DownloadTR;
