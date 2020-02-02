"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tileDim = 10;
var borderDim = 1;
function Tile(props) {

  return React.createElement("div", {
    className: "tile",
    key: props.key,
    onClick: props.onClick,
    style: {
      width: tileDim + "px",
      height: tileDim + "px",
      border: borderDim + "px solid black"
    }
  });
}

var Conway = function (_React$Component) {
  _inherits(Conway, _React$Component);

  function Conway(props) {
    _classCallCheck(this, Conway);

    var _this = _possibleConstructorReturn(this, (Conway.__proto__ || Object.getPrototypeOf(Conway)).call(this, props));

    console.log("Creating grid of dimensions (", props.numRows, ",", props.numCols, ")");

    var grid = [];

    for (var r = 0; r < props.numRows; r++) {
      var row = Array(props.numCols).fill(false);
      grid[r] = row;
    }

    console.log("Initialized Grid.");
    console.log(grid);

    _this.state = {
      numCols: props.numCols,
      numRows: props.numRows,
      grid: grid
    };
    return _this;
  }

  _createClass(Conway, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("Mounted grid, update grid size");
      var height = document.getElementById('grid').clientHeight;
      var width = document.getElementById('grid').clientWidth;
      var numRows = Math.round(height / (2 * borderDim + tileDim));
      var numCols = Math.round(width / (2 * borderDim + tileDim));
      console.log("Resizing to: (", numRows, ",", numCols, ")");
      this.setState({
        numCols: numCols,
        numRows: numRows
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log(this.state);
      console.log("Updated!");
    }
  }, {
    key: "initializeGrid",
    value: function initializeGrid(numRows, numCols) {
      var _this2 = this;

      var rows = [];
      var numTiles = 0;

      var _loop = function _loop(r) {

        var row = [];

        var _loop2 = function _loop2(c) {
          row.push(React.createElement(Tile, { key: ++numTiles, onClick: function onClick() {
              return _this2.updateTile(r, c);
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
    key: "updateTile",
    value: function updateTile(row, col) {

      console.log("Updating tile: (", row, ",", col, ")");
      var grid = this.state.grid;
      grid[row][col] = !grid[row][col];

      this.setState({ grid: grid });
    }
  }, {
    key: "render",
    value: function render() {

      var rows = this.initializeGrid(this.state.numRows, this.state.numCols);

      return React.createElement(
        "div",
        { id: "grid" },
        rows
      );
    }
  }]);

  return Conway;
}(React.Component);

var PageWrapper = function (_React$Component2) {
  _inherits(PageWrapper, _React$Component2);

  function PageWrapper(props) {
    _classCallCheck(this, PageWrapper);

    var _this3 = _possibleConstructorReturn(this, (PageWrapper.__proto__ || Object.getPrototypeOf(PageWrapper)).call(this, props));

    _this3.state = {};

    return _this3;
  }

  _createClass(PageWrapper, [{
    key: "render",
    value: function render() {

      var numRows = 5;
      var numCols = 5;

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(Nav, null),
        React.createElement(Conway, {
          numRows: numRows,
          numCols: numCols
        })
      );
    }
  }]);

  return PageWrapper;
}(React.Component);

ReactDOM.render(React.createElement(PageWrapper, null), document.getElementById('react'));