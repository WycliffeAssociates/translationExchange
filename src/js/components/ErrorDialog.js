import React, {Component} from 'react';
import styled from 'styled-components';
import * as Details from  './componentDetails/ErrorDetails';

export default class ErrorDialog extends Component {

    render() {
        const {type} = this.props;
        let details ='';
        if (type == 'mic') {
            details = Details.mic;
        }

        else if (type == 'upload_comment_fail') {
            details = Details.upload_comment_fail;
        }
        return (
            <Container>

                <Card>
                    <Close onClick={this.props.onClick}>
                        <i style={styles.close} className="material-icons"> close </i>
                    </Close>


                    <ErrorInfo>
                        <Icon>
                            <i style={styles.icon} className="material-icons"> {details.icon} </i>
                        </Icon>

                        <Message>
                            {details.message}
                        </Message>

                        <ExtraInfo>
                            {details.info}
                        </ExtraInfo>

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

const ErrorInfo= styled.div`
  align-self: center;
  width: 80%;
  flex: 1;
  padding: 3vw 3vw;
`;

const Icon = styled.div`
  align-self: center;
`;

const Message = styled.h2`
`;

const ExtraInfo = styled.p`
  margin-top: 2vw;
  font-size: 1vw;
`;