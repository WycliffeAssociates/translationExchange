import React from 'react';
import styled from 'styled-components';

export default ({ redo, txt }) => (
  <DeleteContainer>
    {txt.get("deletingComment")}
    <BlueButton onClick={redo}>{txt.get("undo")} <i class="material-icons">redo</i></BlueButton>
  </DeleteContainer>
);
const DeleteContainer = styled.div`
  background-color:transparent;
  color:white;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BlueButton= styled.button`
  border-radius: 20px
  color: white;
  background: linear-gradient( #0076FF, #00C5FF );
  padding: 0.4vw 2vw;
  font-weight: 100;
  border: none;
  text-decoration: underline;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  outline:none;
  cursor: pointer;
  i{
    vertical-align: middle;
  }
`;
