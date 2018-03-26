import React from 'react';
import styled from 'styled-components';
import img from '../../../../assets/images/obs-en-01-01.jpg';
import TakeCard from '../../takes/newComponents/TakeCard/TakeCard';

export default class KanbanBoard extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <Container>

        <div style ={{height: 'auto', width: 'inherit', background: 'rgba(45,45,45,0.5)', padding: '2vw', color: 'white', marginTop: '1vw'}}>
        {
        //  <TakeCard />
        }
        </div>

        <div style ={{height: 'auto', width: 'inherit', background: 'rgba(45,45,45,0.5)', padding: '2vw', color: 'white' , marginTop: '1vw'}}>

        Column

        </div>


        <div style ={{height: 'auto', width: 'inherit', background: 'rgba(45,45,45,0.5)', padding: '2vw', color: 'white' , marginTop: '1vw'}}>

        Column

        </div>


        <div style ={{height: 'auto', width: 'inherit', background: 'rgba(45,45,45,0.5)', padding: '2vw', color: 'white', marginTop: '1vw'}}>

        Column

        </div>

      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  background: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
 `;
