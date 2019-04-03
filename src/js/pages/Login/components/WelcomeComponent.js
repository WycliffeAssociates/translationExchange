import React from 'react';
import styled, {keyframes} from 'styled-components';
import {zoomIn} from 'react-animations';
import welcomeImg from '../../../../assets/images/undraw_welcome_3gvl.svg'

// import GitHubLogin from '../../../components/social-login/GitHubLogin';

export default class WelcomeComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auth2: '',
      imageSrc: 'defaultImg',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  onLogin(user) {
    this.props.createSocialUser(user, ()=> this.props.history.push('/projects'));
  }

  componentDidMount() {
    if (this.props.socialLogin == true) {
      this.props.history.push ({
        pathname: '/users/registration',
      });
    }
  }

  componentWillUpdate(nextProps) {

    if (nextProps.socialLogin == true) {
      this.props.history.push ({
        pathname: '/users/registration',
      });
    }

  }

  render() {
    const {txt} = this.props;

    return (

      <WelcomePage>

        <h2 className="welcomeh2"> translation Exchange  </h2>
        <Icon src={welcomeImg} />

        <ButtonsContainer>

          <ContinueButton onClick={()=> this.handleClick('continue')}>
            {txt.continue} <i className="material-icons">arrow_forward </i>
          </ContinueButton>

          {
          //<GitHubLogin clientId="f5e981378e91c2067d41"
          //   redirectUri={config.redirectUri}
          //   onSuccess={data=>this.onLogin(data)}
          //   onFailure={this.onLoginFailure}
          //   buttonText={txt.githubSignIn}
          // />
          }

        </ButtonsContainer>

      </WelcomePage>

    );
  }

  handleClick(clickSrc) {

    if (clickSrc === 'continue') {
      this.props.history.push('/users');
    }

  }

}

const zoomInAnimations =keyframes`${zoomIn}`;

const  WelcomePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  justify-self: center;
  min-width: 250px;
  min-height: 400px;
  height: 66%;
  text-align: center;
  //border: solid #969595 0.1vw;
  border-radius: 0.5vw;
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.5);
  animation: ${zoomInAnimations} .3s ease-in;
  `;

WelcomePage.displayName='WelcomePage';

const Icon = styled.img`
  height: 8vw;
  width: 9.5vw;
`;
Icon.displayName = 'Icon';


const ContinueButton = styled.button`
    display: block;
    background: linear-gradient(to bottom, #0076FF, #00C5FF);
    width: 14vw;
    min-width: 150px;
    min-height: 40px;
    margin-top: 1vw;
    padding: 0.5vw 0.5vw;
    font-size: 16px;
    font-weight: 100;
    color: white;
    border: none;
    border-radius: 20px;
    box-shadow: 1px 3px 2px 1px rgba(0,0,0,0.2);
    cursor: pointer;

    i {
      vertical-align: middle;
    }
    `;
ContinueButton.displayName = 'ContinueButton';

const GitHubSignInButton= styled(ContinueButton)`
    display: block;
    padding: 1vw 1vw;
    background: white;
    margin-top: 3vw;
    color: black;
    `;
GitHubSignInButton.displayName = 'GitHubSignInButton';

const ButtonsContainer = styled.div`
    margin-top: 5vw;
    textAlign: center;
    padding: 2vw 8vw;
    width: inherit;
    display: block;

  `;
ButtonsContainer.displayName = 'ButtonsContainer';
