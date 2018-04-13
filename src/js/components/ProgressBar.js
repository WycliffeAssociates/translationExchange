import React from 'react';
import styled from 'styled-components';
import config from '../../config/config';

class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {now, label, resultColor, result} = this.props;
    
    return (
      <ProgressContainer>
        <Result color={resultColor}>{result}</Result>
        <Progress role={"progressbar"} 
          ariaValuenow={now} 
          ariaValuemin={0} 
          ariaValueMax={100}
          style={{width: now + "%"}}>{label ? label : ""}
        </Progress>
      </ProgressContainer>
    );
  }
}

const ProgressContainer = styled.div`
  width: 100%;
  height: 1.5vw;
  overflow: hidden;
  background-color: #f5f5f5;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  border-radius: 1vw;
  text-align: center;
  position: relative;
`;

const Progress = styled.div`
  float: left;
  height: 100%;
  font-size: 0.8vw;
  line-height: 1.6vw;
  color: white;
  text-align: center;
  // background-color: #337ab7;
  background: linear-gradient(#58c5ff, #0f6eff);
  box-shadow: inset 0 -1px 0 rgba(0,0,0,0.15);
  transition: width .6s ease;
`;

const Result = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 10vw);
  font-weight: bold;
  width: 20vw;
  height: 100%;
  padding-top: 0.3vw;
  color: ${props => props.color || "white"}
`;

export default ProgressBar;
