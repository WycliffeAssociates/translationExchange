import React from 'react';
import styled from 'styled-components';


export const SelectAllCheckbox = ({checked, toggleCheck, txt}) => {
  return (
    <ButtonContainer>
      <CompletedButton checked={checked}>
        <CheckBox checked={checked} onClick={toggleCheck}>
          {checked ? <i className="material-icons">done</i> : ''}
        </CheckBox>
        {txt.get("selectAll")}
      </CompletedButton>
    </ButtonContainer>
  );

};

const ButtonContainer = styled.div`
  color: ${props=> props.color}
`;

const CompletedButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #FFF;
  box-shadow: ${props => props.checked ? '0px 6px 6px rgba(0,0,0,0.7)': '0px 3px 6px rgba(0,0,0,0.2)' };
  text-align: center;
  color: ${props => props.checked ? '#43B52F': '' };
  height: 60px;
  width: 214px;
  border-radius: 1px;
  overflow: hidden;
  margin: 20px 20px 20px 35px;
  font-size: 16px;
  `;

ButtonContainer.displayName = 'SelectAllCheckbox';

const CheckBox = styled.span`
     display: inline-block;
     position: relative;
     top: 3px;
     width: 18px;
     height: 18px;
     margin: -1px 0px 0 0;
     vertical-align: middle;
     background: ${props => props.checked ? '#43B52F' :'#FFF' };
     border:${props => props.checked ? '2px solid #43B52F' :'2px solid #707070' };
     cursor: pointer;
     border-radius: 3px;

      input{
        display:none;
      }

      i{
        font-size: 18px;
        position: absolute;
        left:-2px;
        top: -2px;
        color: ${props => props.checked ? '#FFF' :'#EEEEEE' };
      }

    `;
