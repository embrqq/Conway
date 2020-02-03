"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tileDim = 10;
var borderDim = 1;

function Tile(props) {

  return React.createElement("div", {
    className: "tile-" + (props.alive ? 'alive' : 'dead'),
    key: props.key,
    onClick: props.onClick,
    style: {
      width: tileDim + "px",
      height: tileDim + "px",
      border: borderDim + "px solid black"
    }
  });
}

var Grid = function (_React$Component) {
  _inherits(Grid, _React$Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));
  }

  _createClass(Grid, [{
    key: "initializeGrid",
    value: function initializeGrid(grid) {
      var _this2 = this;

      var numRows = grid.length;
      var numCols = grid[0].length;

      var rows = [];
      var numTiles = 0;

      var _loop = function _loop(r) {

        var row = [];

        var _loop2 = function _loop2(c) {
          row.push(React.createElement(Tile, { alive: grid[r][c], key: ++numTiles, onClick: function onClick() {
              return _this2.props.updateTile(r, c);
            } }));
        };

        for (var c = 0; c < numCols; c++) {
          _loop2(c);
        }

        rows.push(React.createElement(
          "div",
          { className: "tile-row", key: ++numTiles },
          row
        ));
      };

      for (var r = 0; r < numRows; r++) {
        _loop(r);
      }
      return rows;
    }
  }, {
    key: "render",
    value: function render() {

      var rows = this.initializeGrid(this.props.grid, this.props.updateTile);

      return React.createElement(
        "div",
        { id: "grid" },
        rows
      );
    }
  }]);

  return Grid;
}(React.Component);

var Conway = function (_React$Component2) {
  _inherits(Conway, _React$Component2);

  function Conway(props) {
    _classCallCheck(this, Conway);

    var _this3 = _possibleConstructorReturn(this, (Conway.__proto__ || Object.getPrototypeOf(Conway)).call(this, props));

    var grid = [[false, false, false], [false, false, false], [false, false, false]];

    _this3.state = {
      ver: 0,
      grid: grid
    };

    return _this3;
  }

  _createClass(Conway, [{
    key: "componentDidMount",
    value: function componentDidMount() {

      console.log("Resizing grid on mount.");
      this.resize();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {

      console.log("State updated.");
      console.log("New state:", this.state);
    }
  }, {
    key: "resize",
    value: function resize() {
      var height = document.getElementById('grid').clientHeight;
      var width = document.getElementById('grid').clientWidth;
      var numRows = Math.round(height / (2 * borderDim + tileDim));
      var numCols = Math.round(width / (2 * borderDim + tileDim));
      console.log("Resizing to: (", numRows, ",", numCols, ")");
      var grid = this.resizeGrid(numRows, numCols);
      this.setState({
        ver: this.state.ver + 1,
        numCols: numCols,
        numRows: numRows,
        grid: grid
      });
    }
  }, {
    key: "resizeGrid",
    value: function resizeGrid(numRows, numCols) {

      console.log("Resizing grid.");

      var grid = this.state.grid;

      //Remove rows if necessary by slicing.
      grid = grid.slice(0, numRows);
      //Add rows if necessary
      if (grid.length < numRows) {
        for (var r = grid.length; r < numRows; r++) {
          if (grid[r] == undefined) {
            grid[r] = Array(numCols).fill(false);
          }
        }
      }

      for (var _r = 0; _r < numRows; _r++) {
        //Remove cols if necessary
        grid[_r] = grid[_r].slice(0, numCols);
        //Add cols if necessary
        if (grid[_r].length < numCols) {
          console.log("Appending to row ", _r);
          grid[_r] = grid[_r].concat(Array(numCols - grid[_r].length).fill(false));
        }
      }

      console.log("Resized grid:", grid);

      return grid;
    }
  }, {
    key: "simulate",
    value: function simulate() {

      console.log("Running an iteration of simulation.");
      console.log("State before simulation:", this.state);

      var numRows = this.state.numRows;
      var numCols = this.state.numCols;
      var grid = [];

      for (var r = 0; r < numRows; r++) {
        grid.push(this.state.grid[r].slice(0, numCols));
      }

      for (var _r2 = 0; _r2 < numRows; _r2++) {
        for (var c = 0; c < numCols; c++) {

          var neighbors = 0;
          //Check num neighbors
          for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
              if (i == 0 && j == 0) continue;
              var _row = _r2 + i;
              var col = c + j;
              if (this.state.grid[(_row % numRows + numRows) % numRows][(col % numCols + numCols) % numCols]) neighbors++;
            }
          }

          if (grid[_r2][c]) {
            console.log("Live cell at: (", _r2, ",", c, ") with ", neighbors, " neighbors.");
          }
          //If the cell is alive and has right number of neighbors it maintains itself:
          if (grid[_r2][c] && (neighbors == 2 || neighbors == 3)) {
            console.log("Maintaining cell: (", _r2, ",", c, ")");
            grid[_r2][c] = true;
          }
          //If the cell is dead but has enough neighbors it comes alive:
          else if (!grid[_r2][c] && neighbors == 3) {
              console.log("Reviving cell: (", _r2, ",", c, ")");
              grid[_r2][c] = true;
            }
            //Else it dies
            else {
                grid[_r2][c] = false;
              }

          //TODO: ADD optimization by keeping track of live cells and only checking cells near those when simulating.
        }
      }

      console.log("Grid after simulation:");
      console.log(grid);

      this.setState({ ver: this.state.ver + 1, grid: grid });
    }
  }, {
    key: "updateTile",
    value: function updateTile(row, col) {

      console.log("Updating tile: (", row, ",", col, ")");
      var grid = this.state.grid;
      grid[row][col] = !grid[row][col];

      this.setState({
        ver: this.state.ver + 1,
        grid: grid
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(Nav, { simulate: function simulate() {
            _this4.simulate(_this4.state);
          } }),
        React.createElement(Grid, {
          grid: this.state.grid,
          updateTile: function updateTile(row, col) {
            return _this4.updateTile(row, col);
          }
        })
      );
    }
  }]);

  return Conway;
}(React.Component);

ReactDOM.render(React.createElement(Conway, null), document.getElementById('react'));