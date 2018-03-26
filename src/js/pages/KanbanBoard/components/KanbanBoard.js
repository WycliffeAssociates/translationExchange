import React from 'react';
import styled from 'styled-components';
import img from '../../../../assets/images/obs-en-01-01.jpg';
import TakeCard from '../../takes/newComponents/TakeCard/TakeCard';
import 'css/takes.css';

export default class KanbanBoard extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    var icon1 = <label className="labelLines"> <i className="far fa-star fa-2x" /> </label>;
    var icon2 = (
      <div className="labelLines">
        <label> <i className="far fa-star fa-2x" /> </label>
        <label> <i className="far fa-star fa-2x" /> </label>
      </div>
    );
    var icon3 = (
      <div className="labelLines">
        <label > <i className="far fa-star fa-2x" /> </label>
        <label > <i className="far fa-star fa-2x" /> </label>
        <label > <i className="far fa-star fa-2x" /> </label>
      </div>
    );
    var icon4 = <label className="labelLines"> <i className="fas fa-check fa-2x" /> </label>;

    return (
      <Container>

        <div style ={{height: 'auto', width: 'auto', background: 'rgba(45,45,45,0.5)', padding: '2vw', color: 'white', margin: '1vw',display: 'flex', flexDirection: 'column'}}>
          <div>
            <center> {icon1} </center>
          </div>

          <div>
            <TContainer />
          </div>

        </div>

        <div style ={{height: 'auto', width: 'auto', background: 'rgba(45,45,45,0.5)', padding: '2vw', color: 'white' , margin: '1vw'}}>
        <div >
          <center> {icon2} </center>
        </div>


        <div>
          <TContainer />
        </div>

        </div>


        <div style ={{height: 'auto', width: 'auto', background: 'rgba(45,45,45,0.5)', padding: '2vw', color: 'white' , margin: '1vw'}}>
        <div >
          {icon3}
        </div>

        <div>
          <TContainer />
        </div>

        </div>


        <div style ={{height: 'inherit', width: 'auto', background: 'rgba(45,45,45,0.5)', padding: '2vw', color: 'white', margin: '1vw'}}>
        <div>
          <center> {icon4} </center>
        </div>

        <div>
          <TContainer />
        </div>

        </div>

      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  background: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
 `;

const TContainer = styled.div`
 background: white;
 border-top: solid 0.04vw lightgray;
 border-left: solid 0.04vw lightgray;
 box-shadow: 3px 3px 3px 1px rgba(0,0,0,0.4);
 width: 18vw;
 height: 15vw;
 border-radius: 0.3vw;
 overflow: hidden;
 border-bottom: none;
 text-align: left;
 margin-top: 1vw;

 `;
