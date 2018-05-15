import React from 'react';
import {connect} from 'react-redux';
import {GET_AUTH_TOKEN}  from '../../../actions/AuthActions';

class Redirect extends React.Component {

  constructor(props) {
    super(props);

    this.parseURLParams = this.parseURLParams.bind(this);
  }

  parseURLParams(url) {
    var queryStart = url.indexOf('?') + 1,
      queryEnd   = url.indexOf('#') + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, ' ').split('&'),
      parms = {}, i, n, v, nv;

    if (query === url || query === '') return;

    for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split('=', 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  }

  componentDidMount() {
    var urlParams = this.parseURLParams(this.props.location.search);
    this.props.dispatch(GET_AUTH_TOKEN(urlParams.code));
    console.log(urlParams.code);
  }

  render() {

    console.log(this.props);

    return (
      <div>

      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({dispatch});


export default connect (mapDispatchToProps)(Redirect);
