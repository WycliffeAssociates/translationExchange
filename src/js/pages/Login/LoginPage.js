import React from 'react';
import WelcomeComponent from './components/WelcomeComponent.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {onLoginSuccess, fetchUsers, createSocialUser, updateLanguage} from '../../actions';
import Menu, { Item as MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Languages from '../../../languages/textToDisplay.json';


export class Welcome extends React.Component {

  componentWillMount() {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this.props.updateLanguage(storedLanguage);
    }

    if(localStorage.getItem('token') != null) {
      this.props.history.push ({
        pathname: '/projects',
      });
    }
  }

  onSelect({key}) {
    const language = key;
    this.props.updateLanguage(language);
    localStorage.setItem('language', language);
  }

  onSettingsClick() {
    this.props.history.push ({
      pathname: '/settings',
    });
  }


  render() {
    const menu = (
      <Menu onSelect={ ky=> this.onSelect(ky)}>
        {Object.keys(Languages).map(lng => 
          <MenuItem style={{cursor: 'pointer', color: '#fff', backgroundColor: '#000' }} key={lng}>
             {lng} 
          </MenuItem> 
        )}
      </Menu>
    );

    return (
      <LoginPage className="pageBackground">
        <LanguageContainer>
          <SettingsButton onClick={this.onSettingsClick.bind(this)}>
            {this.props.txt.settings} <i className="material-icons">settings</i>
          </SettingsButton>
          <Dropdown
            trigger={['click']}
            overlay={menu}
            animation="slide-up"
          >
            <Language>{this.props.txt.languages} <i className="material-icons">language</i></Language>
          </Dropdown>
        </LanguageContainer>

        <WelcomeComponent {...this.props} />
      </LoginPage>
    );
  }

}

const LoginPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;
LoginPage.displayName = 'LoginPage';

const Language = styled.p`
  color:white;
  cursor:pointer;
`;
Language.displayName = 'Language';

const LanguageContainer = styled.div`
  width:100%;
  display:flex;
  justify-content: flex-end;
  margin: 0;
`;
LanguageContainer.displayName = 'LanguageContainer';

const SettingsButton = styled.a`
  margin-right: 1vh;
  color: white;
  cursor: pointer;

  :hover {
    color: white;
  }
`;
SettingsButton.displayName = 'SettingsButton';

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  onLoginSuccess, fetchUsers, createSocialUser, updateLanguage }, dispatch);
};

const mapStateToProps = state => {
  const { socialLogin } = state.user;
  const {txt} = state.geolocation;
  return {socialLogin, txt};
};

export default connect(mapStateToProps, mapDispatchToProps) (Welcome);
