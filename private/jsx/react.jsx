"use strict";

let tileDim = 10;
let borderDim = 1;
function Tile(props){

  return(

    <div
      className="tile"
      key={props.key}
      onClick={props.onClick}
      style={
        {
          width:(tileDim+"px"),
          height:(tileDim+"px"),
          border:(borderDim+"px solid black")
        }
      }
    />

  );

}

class Conway extends React.Component {

  constructor(props){

    super(props)

    console.log("Creating grid of dimensions (", props.numRows, ",", props.numCols, ")")

    let grid = [];

    for(let r = 0; r < props.numRows; r++){
      let row = Array(props.numCols).fill(false)
      grid[r] = row;
    }

    console.log("Initialized Grid.");
    console.log(grid);

    this.state = {
      numCols: props.numCols,
      numRows: props.numRows,
      grid: grid
    }
  }

  componentDidMount(){
    console.log("Mounted grid, update grid size");
    let height = document.getElementById('grid').clientHeight;
    let width = document.getElementById('grid').clientWidth;
    let numRows = Math.round(height / ((2 * borderDim) + tileDim));
    let numCols = Math.round(width / ((2 * borderDim) + tileDim));
    console.log("Resizing to: (", numRows, ",", numCols, ")")
    this.setState(
      {
        numCols: numCols,
        numRows: numRows
      }
    )
  }

  componentDidUpdate(){
    console.log(this.state);
    console.log("Updated!");
  }

  initializeGrid(numRows, numCols){
    let rows = [];
    let numTiles = 0;
    for(let r = 0; r < numRows; r++){

      let row = [];

      for(let c = 0; c < numCols; c++){
        row.push(<Tile key={++numTiles} onClick={() => this.updateTile(r, c)} />);
      }

      rows.push(
        <div className="tile-row" key={++numTiles}>
          {row}
        </div>
      );
    }
    return rows;
  }

  updateTile(row, col){

    console.log("Updating tile: (", row, ",", col, ")")
    let grid = this.state.grid
    grid[row][col] = !grid[row][col]

    this.setState({grid:grid})

  }

  render(){

    let rows = this.initializeGrid(this.state.numRows,this.state.numCols);

    return(

      <div id="grid">
        {rows}
      </div>

    );

  }

}

class PageWrapper extends React.Component {

  constructor(props){

    super(props);

    this.state = {

    }

  }

  render(){

    let numRows = 5;
    let numCols = 5;

    return (

      <React.Fragment>
        <Nav/>
        <Conway
          numRows={numRows}
          numCols={numCols}
        />
      </React.Fragment>

    );

  }

}

ReactDOM.render(<PageWrapper/>, document.getElementById('react'));
