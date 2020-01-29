import React, {Component} from 'react';
import styled from 'styled-components';
import LoadingTransfer from './LoadingTransfer';


class DownloadingTransfer extends Component {

  constructor(props) {
    super(props);
    this.state={percentage: 0, done: false};
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.getTransferProgress(this.props.taskId, this.updateProgress);
    }, 2000);
  }

  updateProgress(percentage, done) {
    this.setState({percentage});
    if (done) {
      clearInterval(this.interval);
      this.setState({done});

    }
  }

  componentWillUnmount() {

    clearInterval(this.interval);
  }

  render() {
    const { done, percentage } = this.state;
    const { txt, close } = this.props;
    return (
      <Container>
        {
          done ?
            <SuccessContainer>
              <i className="material-icons">check_circle</i>
              <p>{txt.get("success")}</p>
              <BlueButton onClick={()=> close()}>{txt.get("done")} <i class="material-icons">touch_app</i> </BlueButton>
            </SuccessContainer>
            :
            <Container>
              <LoadingTransfer />
              <TextContainer>
                <p>{percentage}%</p>
                <p> {txt.get("generating")}... </p>
              </TextContainer>

            </Container>
        }
      </Container>
    );
  }
}

const Container = styled.div``;

const SuccessContainer = styled.div`
  margin-top: 50px;
  color: #43B52F;
  font-size: 30px;
  i{
    font-size: 150px;
  }
`;

const TextContainer = styled.div`
  margin-top: 50px;
  color: #E56060;
`;

const BlueButton = styled.button`
    background: linear-gradient(to bottom, #00C5FF, #009CFF);
    width: 154px;
    height: 40px;
    font-size: 14px;
    font-weight: 100;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: .3s ease-in-out;

    i {
      vertical-align: middle;
      font-size: 20px;
    }

    :hover{
      background: #3BAC2A;
      color: #FFF;
      border: 2px solid #3BAC2A;

    }
    `;

export default DownloadingTransfer;
