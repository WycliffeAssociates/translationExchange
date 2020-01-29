import React, { Component } from "react";
import jdenticon from "jdenticon";
import styled, {keyframes} from "styled-components";
import {fadeIn} from 'react-animations';

class UserCreated extends Component {
  componentDidMount() {
    const { hash } = this.props.user || "";
    jdenticon.update("#createdUser", hash);
  }

  redirect() {
    this.props.history.push({ pathname: "/projects" });
  }

  render() {
    const { hash, txt } = this.props;

    return (
      <Container>
        <TextHeader> {txt.get("youAreReadyToGo")} </TextHeader>
        <IdenticonContainer>
          <svg
            id="createdUser"
            width="90%"
            height="90%"
            data-jdenticon-hash={hash}
          />
        </IdenticonContainer>
        <Button onClick={() => this.redirect()}>
          <span style={{textDecoration:'underline'}}> {txt.get("goToProjects")}</span>
          <i className="material-icons" style={{ fontSize: "1.7vw" }}>
            arrow_forward
          </i>
        </Button>
      </Container>
    );
  }
}

const fadeInAnimation = keyframes`${fadeIn}`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-around;
  animation: ${fadeInAnimation} .5s ease-in;
`;

const TextHeader = styled.h1`
  font-size: 50px;
`;

const IdenticonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content:center;
  border-radius: 20px;
  color: white;
  background: linear-gradient(to bottom, #0076ff, #00c5ff);
  height:40px;
  width:250px;
  font-size: 18px;
  font-weight: 100;
  border: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
Button.displayName = "Button";
export default UserCreated;
