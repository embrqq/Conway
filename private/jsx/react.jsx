"use strict";

let tileDim = 10;
let borderDim = 1;

function Tile(props){

  return(

    <div
      className={"tile-"+((props.alive ? 'alive' : 'dead'))}
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

class Grid extends React.Component {

  constructor(props){
    super(props)
  }

  initializeGrid(grid){

    let numRows = grid.length;
    let numCols = grid[0].length;

    let rows = [];
    let numTiles = 0;
    for(let r = 0; r < numRows; r++){

      let row = [];

      for(let c = 0; c < numCols; c++){
        row.push(<Tile alive={grid[r][c]} key={++numTiles} onClick={() => this.props.updateTile(r, c)} />);
      }

      rows.push(
        <div className="tile-row" key={++numTiles}>
          {row}
        </div>
      );
    }
    return rows;
  }

  render(){

    let rows = this.initializeGrid(this.props.grid, this.props.updateTile);

    return(

      <div id="grid">
        {rows}
      </div>

    );

  }

}

class Conway extends React.Component {

  constructor(props){

    super(props);

    let grid = [[false, false, false],[false, false, false],[false, false, false]]

    this.state = {
      ver: 0,
      grid:grid
    }

  }

  componentDidMount(){

    console.log("Resizing grid on mount.");
    this.resize()

  }

  componentDidUpdate(){

    console.log("State updated.");
    console.log("New state:", this.state);

  }

  resize(){
    let height = document.getElementById('grid').clientHeight;
    let width = document.getElementById('grid').clientWidth;
    let numRows = Math.round(height / ((2 * borderDim) + tileDim));
    let numCols = Math.round(width / ((2 * borderDim) + tileDim));
    console.log("Resizing to: (", numRows, ",", numCols, ")");
    let grid = this.resizeGrid(numRows, numCols);
    this.setState(
      {
        ver: this.state.ver + 1,
        numCols: numCols,
        numRows: numRows,
        grid: grid
      }
    );
  }

  resizeGrid(numRows, numCols){

    console.log("Resizing grid.")

    let grid = this.state.grid;

    //Remove rows if necessary by slicing.
    grid = grid.slice(0, numRows);
    //Add rows if necessary
    if(grid.length < numRows){
      for(let r = grid.length; r < numRows; r++){
        if(grid[r] == undefined){
          grid[r] = Array(numCols).fill(false)
        }
      }
    }

    for(let r = 0; r < numRows; r++){
      //Remove cols if necessary
      grid[r] = grid[r].slice(0, numCols);
      //Add cols if necessary
      if(grid[r].length < numCols){
        console.log("Appending to row ", r)
        grid[r] = grid[r].concat(Array(numCols - grid[r].length).fill(false));
      }
    }

    console.log("Resized grid:", grid)

    return grid;
  }

  simulate(){

    console.log("Running an iteration of simulation.");
    console.log("State before simulation:", this.state)

    let numRows = this.state.numRows;
    let numCols = this.state.numCols;
    let grid = [];

    for(let r = 0; r < numRows; r++){
      grid.push(this.state.grid[r].slice(0, numCols));
    }


    for(let r = 0; r < numRows; r++){
      for(let c = 0; c < numCols; c++){

        let neighbors = 0;
        //Check num neighbors
        for(let i = -1; i < 2; i++){
          for(let j = -1; j < 2; j++){
            if(i == 0 && j == 0) continue;
            let row = r + i;
            let col = c + j;
            if(this.state.grid[(((row%numRows)+numRows)%numRows)][(((col%numCols)+numCols)%numCols)]) neighbors++;
          }

        }

        if(grid[r][c]){
          console.log("Live cell at: (", r, ",", c,") with ", neighbors, " neighbors.");
        }
        //If the cell is alive and has right number of neighbors it maintains itself:
        if(grid[r][c] && (neighbors == 2 || neighbors == 3)){
          console.log("Maintaining cell: (", r, ",", c,")");
          grid[r][c] = true;
        }
        //If the cell is dead but has enough neighbors it comes alive:
        else if(!grid[r][c] && neighbors == 3){
          console.log("Reviving cell: (", r, ",", c,")");
          grid[r][c] = true;
        }
        //Else it dies
        else{
          grid[r][c] = false;
        }

        //TODO: ADD optimization by keeping track of live cells and only checking cells near those when simulating.

      }
    }

    console.log("Grid after simulation:");
    console.log(grid);

    this.setState({ver:this.state.ver + 1, grid:grid});

  }

  updateTile(row, col){

    console.log("Updating tile: (", row, ",", col, ")")
    let grid = this.state.grid
    grid[row][col] = !grid[row][col]

    this.setState({
      ver:this.state.ver + 1,
      grid:grid
    });

  }

  render(){
    return (

      <React.Fragment>
        <Nav simulate={() => {this.simulate(this.state)}}/>
        <Grid
          grid={this.state.grid}
          updateTile={(row,col) =>this.updateTile(row,col)}
        />
      </React.Fragment>

    );

  }

}

ReactDOM.render(<Conway/>, document.getElementById('react'));
