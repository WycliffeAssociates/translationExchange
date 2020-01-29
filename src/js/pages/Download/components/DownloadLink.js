import React from 'react';
import styled from 'styled-components';
import config from '../../../../config/config';
import DownloadButton from './DownloadButton';

export default class DownloadLink extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {txt, name, url} = this.props;

    var recommended = false;

    var fileOs;
    if(name.endsWith(".apk")) {
      fileOs = "Android";
      recommended = this.props.userAgent.isAndroid;
    } else if(name.endsWith(".exe")) {
      fileOs = "Windows";
      recommended = this.props.userAgent.isWindows;
    } else if(name.endsWith(".AppImage")) {
      fileOs = "Linux";
      recommended = this.props.userAgent.isLinux;
    } else if(name.endsWith("mac.zip")) {
      fileOs = "Mac OS"
      recommended = this.props.userAgent.isMac;
    } else {
      fileOs = "Unknown";
    }

    return (
      <Container>
        <Os>{fileOs} 
          <div>{recommended ? "("+txt.get("recommended")+")" : ""}</div>
        </Os>
        <FileName>{name}</FileName>
        <DownloadButton onClick={()=> {}} url={config.streamingUrl + url} txt={txt} 
          isSecondary={!recommended} marginRight={'3vh'}/>
      </Container>
    );
  }

}

const Container = styled.li`
  border-bottom: 1px solid #ccc;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
Container.displayName = 'Container';

const Os = styled.div`
  width: 10vh
`;
Os.displayName = 'Os';

const FileName = styled.div`
  text-align: left;
  width: 40vh;
`;
FileName.displayName = 'FielName';