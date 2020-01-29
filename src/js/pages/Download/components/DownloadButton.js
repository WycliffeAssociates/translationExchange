import React from 'react';
import styled from 'styled-components';
import config from '../../../../config/config';

export default class DownloadButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {txt, url, isSecondary, marginRight, onClick} = this.props;

    return (
      <Container onClick={()=>onClick()} href={url} isSecondary={isSecondary} marginRight={marginRight}>
        {txt.get("download")} <i className="material-icons">get_app </i>
      </Container>
    );
  }

}

const Container = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.isSecondary ? 'none' : 'linear-gradient(to bottom, #0076FF, #00C5FF)'};
  width: 10vh;
  min-width: 150px;
  min-height: 40px;
  font-size: 16px;
  font-weight: 100;
  color: ${props => props.isSecondary ? '#009CFF' : 'white'};
  border: ${props => props.isSecondary ? '2px solid #009CFF' : 'none'};
  border-radius: 20px;
  box-shadow: 1px 3px 2px 1px rgba(0,0,0,0.2);
  cursor: pointer;
  margin-right: ${props => props.marginRight};

  :hover{
    background: none;
    background-color: #3BAC2A;
    border-color: #3BAC2A;
    color: white;
  }
`;
Container.displayName = 'Container';