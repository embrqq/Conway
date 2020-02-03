"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function NavButton(props) {

  return React.createElement(
    "div",
    { className: "nav-button" },
    React.createElement(
      "button",
      { onClick: props.onClick },
      props.text
    )
  );
}

function SpeedSlider(props) {

  return React.createElement(
    "div",
    { className: "speed-slider" },
    React.createElement("input", { type: "range", min: "1", max: "100", defaultValue: "1", className: "range-slider", id: "myRange" })
  );
}

var Nav = function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav(props) {
    _classCallCheck(this, Nav);

    return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));
  }

  _createClass(Nav, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "nav" },
        React.createElement(NavButton, { text: "\u25BA", onClick: function onClick() {
            console.log("Pressed Run!");_this2.props.simulate();
          } }),
        React.createElement(NavButton, { text: "\u275A\u275A", onClick: function onClick() {
            console.log("Pressed Pause!");
          } }),
        React.createElement(NavButton, { text: "Reset", onClick: function onClick() {
            console.log("Pressed Reset!");
          } }),
        React.createElement(SpeedSlider, null)
      );
    }
  }]);

  return Nav;
}(React.Component);