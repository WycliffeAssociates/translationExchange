import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';


export class SettingsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serverName: localStorage.getItem("uploadServer") || "opentranslationtools.org"
    };

    this.onServerNameChange = this.onServerNameChange.bind(this);
  }

  componentWillMount() {
  }

  onServerNameChange(value) {
    this.setState({ serverName: value });
  }

  onSaveClick() {
    localStorage.setItem("uploadServer", this.state.serverName);
    alert("Settings saved! Please restart the app.");
  }

  onRestoreClick() {
    this.setState({ serverName: "opentranslationtools.org" });
  }

  render() {
    const {txt} = this.props;
    
    return (
      <Container>
        
        <BackLink onClick={()=> this.props.history.goBack()}>
          <i className="material-icons">arrow_backward </i> {txt.get("goBack")}
        </BackLink>

        <Header>
          {txt.get("settings")}
        </Header>

        <SettingsContainer>
          <SettingsItem>
            <SettingsTitle>{txt.get("serverName")}</SettingsTitle>
            <SettingsValue>
              <SettingsInput type="text" id="serverName" 
                value={this.state.serverName}
                onChange={(e) => {this.onServerNameChange(e.target.value)}} />
            </SettingsValue>
          </SettingsItem>
        </SettingsContainer>

        <ButtonsContainer>
          <SaveButton onClick={this.onSaveClick.bind(this)}>{txt.get("save")}</SaveButton>
          <RestoreDefaultsButton onClick={this.onRestoreClick.bind(this)}>{txt.get("restoreDefaults")}</RestoreDefaultsButton>
        </ButtonsContainer>
      </Container>
    );
  }

}

const Container= styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 0 10vh;
  position: relative;
`;
Container.displayName = 'Container';

const Header = styled.div`
  font-size: 22px;
  margin-top: 10vh;
  text-align: center;
  height: 5vh;
`;
Header.displayName = 'Header';

const BackLink = styled.a`
  position: absolute;
  top: 30px;
  left: 30px;
  cursor: pointer;
  color: #4183c4 !important;
  display: block;
  font-size: 22px;

  i {
    width: 3vh;
  }
`;
BackLink.displayName = 'BackLink';

const SettingsContainer= styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;
SettingsContainer.displayName = 'SettingsContainer';

const SettingsItem = styled.div`
  display: flex;
`;
SettingsItem.displayName = 'SettingsItem';

const SettingsTitle = styled.div`
  width: 200px;
  font-weight: bold;
`;
SettingsTitle.displayName = 'SettingsTitle';

const SettingsValue = styled.div`
  width: 300px;
`;
SettingsValue.displayName = 'SettingsValue';

const SettingsInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  padding: 0 5px;
`;
SettingsInput.displayName = 'SettingsInput';

const ButtonsContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
`;
ButtonsContainer.displayName = 'ButtonsContainer';

const SaveButton = styled.a`
  cursor: pointer;
  display: block;
  margin-right: 5vh;
  font-weight: bold;
`;
SaveButton.displayName = 'SaveButton';

const RestoreDefaultsButton = styled.a`
  cursor: pointer;
  display: block;
  font-weight: bold;
`;
RestoreDefaultsButton.displayName = 'RestoreDefaultsButton';

const mapStateToProps = state => {
  const {txt} = state.geolocation;
  return {txt};
};

export default connect(mapStateToProps) (SettingsPage);