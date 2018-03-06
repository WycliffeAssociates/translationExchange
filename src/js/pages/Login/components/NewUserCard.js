import React from 'react';

export default class NewUserCard extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div>
        <div style={divStyle}>

          <button style={addButton}> <i className="fa fa-user-plus fa-5x" /> </button>
          <label style={cardLabel}> New User </label>


        </div>

      </div>
    );
  }

}


const divStyle = {


  textAlign: 'center',
  height: '18vw',
  width: '15vw',
  borderRadius: '20px',
  boxShadow: '3px 4px 5px rgba(0,0,0,0.6)',
  overflow: 'hidden',
  backgroundColor: 'white',
  padding: '2vw 3.5vw',

};

const addButton = {

  color: '#29B4F5',
  marginBottom: '1.5vw',
  //fontSize: '2vw',
};

const cardLabel = {
  color: '#29B4F5',
  fontSize: '1.75vw',
};
