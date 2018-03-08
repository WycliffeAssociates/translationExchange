import React from 'react';

export default class NewUserCard extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }


  render() {

    return (
      <div className="NewUserCard" onClick={this.handleClick}>
        <div style={styles.divStyle}>

          <button style={styles.addButton} > <i className="fa fa-user-plus" /> </button>
          <label style={styles.cardLabel}> New User </label>


        </div>

      </div>
    );
  }


  handleClick() {
    this.props.history.push({pathname: '/users/new-user'});
  }

}


const styles = {

  divStyle: {

    textAlign: 'center',
    height: '18vw',
    width: '15vw',
    borderRadius: '20px',
    boxShadow: '3px 4px 5px rgba(0,0,0,0.6)',
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: '2vw 3.5vw',
  },



  addButton: {

    color: '#29B4F5',
    marginBottom: '1.5vw',
    border: 'none',
    fontSize: '8vw',
    backgroundColor: 'white',

  },

  cardLabel: {
    color: '#29B4F5',
    fontSize: '1.85vw',
  },

};
