import React from 'react';
import {Icon} from 'semantic-ui-react';


const MultipleTakesButton = ({onClick}) => (
<div className="buttonContainer" style={styles.buttonContainer} >
  <button onClick={onClick} style={styles.buttonStyle} >
          <Icon name="plus" size="big" color="blue"/>
  </button>
  </div>
);


const styles = {
  buttonStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: "#000",
    cursor: 'pointer',
    // border:'none'

  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
    flex: '0 0, auto',
    marginLeft: 10

  }

}

export {MultipleTakesButton};
