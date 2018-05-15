import React, {Component} from 'react';
import styled from 'styled-components';
import BorderButton from '../../../components/BorderButton';
import {Volume} from './'

export class Downloading extends Component {

  constructor(props) {
    super(props);
    this.state={percentage: 0, previous: 0, counter: 1};
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.getDownloadProgress(this.props.taskId, this.updateProgress);
    }, 1000);
  }

  updateProgress(percentage, done) {
    this.setState({percentage})
    if (done) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  add() {
    const {percentage, previous} = this.state;

    this.setState({percentage: percentage +5, previous: percentage +2})
  }

  render() {
    const {type, txt} = this.props;
    const {percentage, previous} = this.state;
    const value = -.757*(percentage) + 85.7;
    const prevValue = -.757*(previous) + 85.7;

    if (percentage < 100) {
      //setTimeout(()=>{this.add(); }, 900);
    }


    return (
      <Container>
        {/* <i class="material-icons"> {this.props.icon}</i> */}
        <Volume percentage={`${value}%`} prevValue={`${prevValue}%`} />
        <p>{percentage} %</p>
        <p>{txt.downloading} {type}  </p>
        <BorderButton
          onClick ={this.props.cancel} txt={txt.cancel}
          color={'#009CFF'}
          height={'40px'}
          width={'214px'}
          iconSize={'24px'}
          border={'2px'}
          radius={'4px'} />
      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i{
    font-size: 450px;
  }
`;
