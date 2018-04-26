import React from 'react';

export default class Root extends React.Component {


  render() {

    return (
      <div style={style} >
        <i onClick={()=> this.props.history.push('/welcome')} style ={icon} class="material-icons">account_circle</i>
      </div>
    );
  }

}


const style = {
  background: 'linear-gradient(to bottom right, #0F98CB, #31E8F4)',
  height: '100vh',
  width: '100vw',
  textAlign: 'center',
  padding: '5vw 0',


};
const icon = {
cursor: 'pointer',
}
