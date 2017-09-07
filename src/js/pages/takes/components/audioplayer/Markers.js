import React from 'react';

class Markers extends React.Component {


  constructor(props){
    super(props);
    // this.state = { newPostion: this.props.translate}
  }

  getPosition(position){
  //  console.log(position)
    this.props.dragPosition(position);            // change name to moveCursor

  }


  render() {
    let verseMarkers = this.props.text;
    const markerLength = verseMarkers.length;
   const position = this.props.translate;



     if (markerLength > 3) {
      verseMarkers = '';
    }

    return (

      <svg
        onClick={()=> this.props.dragPosition(position)}
        style={{position: 'absolute', left: position, bottom: 65, cursor: 'pointer' }}
        width="29px"
        height="63px"
        viewBox="0 0 29 63"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
              <path  d="M0.5,2.22034441e-16 L27.8715047,2.22034441e-16 L27.8715047,3.33066907e-16 C28.147647,-1.67976798e-15 28.3715047,0.223857625 28.3715047,0.5 L28.3715047,28.6575595 L28.3715047,28.6575595 C28.3715047,28.9337018 28.147647,29.1575595 27.8715047,29.1575595 C27.7505276,29.1575595 27.6336532,29.1136977 27.5425465,29.034105 L14.1857523,17.3653262 L0.828958158,29.034105 L0.828958158,29.034105 C0.620997808,29.2157835 0.305133052,29.194478 0.123454478,28.9865176 C0.0438617092,28.8954109 -3.73135802e-15,28.7785365 -2.88657986e-15,28.6575595 L0,0.5 L0,0.5 C-3.38176876e-17,0.223857625 0.223857625,5.07271091e-17 0.5,0 Z" id="path-1"></path>
        </defs>
          <g  id="Page-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group2" transform="translate(0.000000, 1.000000)">
                <path d="M1,0.5 L1,60.5" id="Line2" stroke="#F0FF36" strokeWidth="2" strokeLinecap="square"></path>
                <g id="Rectangle">
                    <use fill="#F0FF36 " fillRule="evenodd" xlinkHref="#path-1"></use>
                    <path stroke="#979797 " strokeWidth="0.5" d="M0.5,0.25 C0.361928813,0.25 0.25,0.361928813 0.25,0.5 L0.25,28.6575595 C0.25,28.718048 0.271930855,28.7764852 0.311727239,28.8220385 C0.402566526,28.9260187 0.560498904,28.9366715 0.664479079,28.8458322 L14.1857523,17.033361 L27.7070256,28.8458322 C27.752579,28.8856286 27.8110162,28.9075595 27.8715047,28.9075595 C28.0095759,28.9075595 28.1215047,28.7956306 28.1215047,28.6575595 L28.1215047,0.5 C28.1215047,0.361928813 28.0095759,0.25 27.8715047,0.25 L0.5,0.25 Z"></path>
                </g>
            </g>
        </g>
        <text textAnchor="middle"
         x="14"
         y="12"
         fontFamily="roboto"
         fontSize="11"
         fill="#00040c" >{verseMarkers}</text>

      </svg>



    );
  }
}







export default Markers;
