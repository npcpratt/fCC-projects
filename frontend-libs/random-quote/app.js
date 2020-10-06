'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

// fetch quotes from freeCodeCamp json
var quotesData = [];
fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(function (res) {
    return res.json();
}).then(function (result) {
    quotesData = result.quotes;
});

// get random quote

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            quotes: quotesData.quotes
        };
        return _this;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            console.log(this.state.quotes);
            return React.createElement(
                'div',
                { id: 'quote-box' },
                React.createElement('i', { className: 'fas fa-quote-left' }),
                React.createElement(
                    'div',
                    { id: 'text' },
                    'asdf'
                ),
                React.createElement(
                    'div',
                    { id: 'author' },
                    'asdf'
                ),
                React.createElement(
                    'button',
                    { id: 'new-quote' },
                    'New Quote'
                ),
                React.createElement(
                    'a',
                    { href: 'twitter.com', id: 'tweet-quote' },
                    React.createElement('i', { 'class': 'fab fa-twitter' }),
                    ' Tweet'
                )
            );
        }
    }]);

    return App;
}(React.Component);

var domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);