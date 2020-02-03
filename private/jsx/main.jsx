"use strict";

function NavButton(props){

  return (

    <div className="nav-button">
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>

  );

}

function SpeedSlider(props){

  return (

    <div className="speed-slider">
      <input type="range" min="1" max="100" defaultValue="1" className="range-slider" id="myRange"/>
    </div>

  );

}

class Nav extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return (
      <div className="nav">
        <NavButton text="&#9658;" onClick={() => {console.log("Pressed Run!"); this.props.simulate()}}/>
        <NavButton text="&#10074;&#10074;" onClick={() => {console.log("Pressed Pause!")}}/>
        <NavButton text="Reset" onClick={() => {console.log("Pressed Reset!")}}/>
        <SpeedSlider />
      </div>
    );

  }

}
