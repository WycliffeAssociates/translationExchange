import React from 'react';

export default class playerTracker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playerTime: 0,
      interval: '',
    };
  }

  componentDidMount() {

    this.state.interval = setInterval(() => {
      this.setState(prevState => ({playerTime: prevState.playerTime+.025}));
    },25);

  }


  render() {

    if (this.state.playerTime > 3.999) {
      console.log(this.state.playerTime);
      clearInterval(this.state.interval);
    }

    return (
      <div style={{width: 'inherit', color: 'steelblue', background: 'none', marginTop: '0.4vw'}}>
        <input type="range"  mim="0" max={4} step="1" value={this.state.playerTime} />
      </div>
    );
  }

}
