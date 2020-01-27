import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getDownloads} from '../../actions';
import styled from 'styled-components';
import DownloadLink from './components/DownloadLink';
import Loading from '../../components/Loading';


export class Download extends Component {

  constructor(props) {
    super(props);
    const $this = this;

    this.state = {
      userAgent: {
        isClient: $this.isClient(),
        isAndroid: $this.isAndroid(),
        isWindows: $this.isWindows(),
        isLinux: $this.isLinux(),
        isMac: $this.isMac(),
      }
    };
  }

  isClient() {
    return navigator.userAgent.indexOf("TranslationExchangeClient") > -1
  }

  isAndroid() {
    return navigator.userAgent.indexOf("Android") > -1
  }

  isWindows() {
    return navigator.userAgent.indexOf("Windows") > -1
  }

  isLinux() {
    return navigator.userAgent.indexOf("Linux") > -1 &&
      navigator.userAgent.indexOf("Android") == -1
  }

  isMac() {
    return navigator.userAgent.indexOf("Macintosh") > -1
  }

  componentWillMount() {
    const {getDownloads} = this.props;
    getDownloads();
  }

  render() {
    const {downloads, txt} = this.props;
    
    return (
      <Container>
        
        <BackLink onClick={()=> this.props.history.goBack()}>
          <i className="material-icons">arrow_backward </i> {txt.get("goBack")}
        </BackLink>

        <Header>
          {txt.get("downloadClients")}
        </Header>

        {
          this.props.loading?

          <Loading marginTop={'50px'} txt={this.props.txt} height= {'auto'} />

          :

          <DownloadList>
          {
            downloads.length > 0 ?
              downloads.map( (download, index) =>
                <DownloadLink
                  key={index}
                  name ={download.name}
                  url ={download.url}
                  userAgent={this.state.userAgent}
                  {...this.props}
                /> )
              :
              <NoDownloads>{txt.get("noDownloads")}</NoDownloads>
          }
          </DownloadList>
        }
      </Container>
    );
  }

}

const Container= styled.div`
  height: 100%;
  width: 70%;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  position: relative;
`;
Container.displayName = 'Container';

const Header = styled.div`
  font-size: 22px;
  margin-top: 10vh;
  text-align: center;
`;
Header.displayName = 'Header';

const DownloadList = styled.ul`
  list-style-type: none;
  margin: 10vh 0 0 0;
  padding: 0;
`;
DownloadList.displayName = 'DownloadList';

const NoDownloads = styled.div`
  font-size: 20px;
`;
NoDownloads.displayName = 'NoDownloads';

const BackLink = styled.a`
  position: absolute;
  top: 30px;
  left: 0px;
  cursor: pointer;
  color: #4183c4 !important;
  display: block;
  font-size: 22px;

  i {
    width: 3vh;
  }
`;
BackLink.displayName = 'BackLink';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getDownloads}, dispatch);
};

const mapStateToProps = state => {
  const { downloads, loading } = state.Downloads;
  const {txt} = state.geolocation;
  return {txt, downloads, loading};
};

export default connect(mapStateToProps,mapDispatchToProps) (Download);