import React from 'react';
import styled from 'styled-components';
import config from '../../../../config/config';

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
        <div style={{width: "10vh"}}>{fileOs} 
          <div>{recommended ? "("+txt.recommended+")" : ""}</div>
        </div>
        <div style={{textAlign: "left", width: "40vh"}}>{name}</div>
        <DownloadButton href={config.streamingUrl + url}>
        {txt.download} <i className="material-icons">arrow_downward </i>
        </DownloadButton>
      </Container>
    );
  }

}

const Container = styled.li`
  border-bottom: 1px solid #ccc;
  height: 12vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
Container.displayName = 'Container';

const DownloadButton = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #0076FF, #00C5FF);
    width: 7vw;
    min-width: 150px;
    min-height: 40px;
    font-size: 16px;
    font-weight: 100;
    color: white !important;
    border: none;
    border-radius: 20px;
    box-shadow: 1px 3px 2px 1px rgba(0,0,0,0.2);
    cursor: pointer;
    `;
DownloadButton.displayName = 'DownloadButton';