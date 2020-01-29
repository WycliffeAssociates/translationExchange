import React, {Component} from 'react';
import styled from 'styled-components';


export default class ErrorDialog extends Component {

  render() {
    const {type, txt} = this.props;
    let icon = 'mic_off';
    let message = txt.get("micMessage");
    let info = txt.get("micError");
    let instructions = txt.get("micInstructions");

    if (type == 'upload_comment_fail') {
      message = txt.get("uploadMessage");
      info = txt.get("uploadError");
      icon = 'error';


    }
    return (
      <Container>

        <Card>
          <Close onClick={this.props.onClick}>
            <i style={styles.close} className="material-icons">close </i>
          </Close>


          <ErrorInfo>
            <Icon>
              <i style={styles.icon} className="material-icons">{icon}</i>
            </Icon>

            <Message>
              {message}
            </Message>

            <ExtraInfo>
              {info}
            </ExtraInfo>

            <Instructions>
              {instructions}
            </Instructions>

          </ErrorInfo>

        </Card>

      </Container>
    );
  }
}

const styles = {

  close: {
    color: 'white',
    margin: '1vw',
    height: '4vh',
    width: '2vw',
  },

  icon: {
    color: 'white',
    height: '20vh',
    width: '10vw',
    fontSize: '10vw',

  },

};

const Container = styled.div`
  background: rgba(45,45,45,0.8);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top:0;
  left:0;
  z-index: 99;
`;
Container.displayName = 'Container';


const Card = styled.div`
  background: #D33F30;
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 32vw;
  border-radius: 2vw;
  text-align: center;
  color: white;
`;
Card.displayName = 'Card';


const Close = styled.div`
  align-self: flex-end;
  cursor: pointer;
`;

Close.displayName = 'Close';

const ErrorInfo= styled.div`
  align-self: center;
  width: 80%;
  flex: 1;
  padding: 3vw 3vw;
`;
ErrorInfo.displayName = 'ErrorInfo';

const Instructions = styled.p`
  font-size: 0.75vw;
`;
Instructions.displayName = Instructions;

const Icon = styled.div`
  align-self: center;
`;
Icon.displayName= 'Icon';

const Message = styled.h2`
`;
Message.displayName = 'Message';
const ExtraInfo = styled.p`
  margin-top: 2vw;
  font-size: 1vw;
`;
ExtraInfo.displayName = 'ExtraInfo';
