'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            error: null,
            isLoaded: false,
            quotes: [],
            current: Math.floor(Math.random() * 103)
        };
        _this.getNewQuote = _this.getNewQuote.bind(_this);
        return _this;
    }

    // Fetch quotes from freeCodeCamp's quotes.json file


    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(function (res) {
                return res.json();
            }).then(function (result) {
                _this2.setState({
                    isLoaded: true,
                    quotes: result.quotes
                }), function (error) {
                    _this2.setState({
                        isLoaded: true,
                        error: error
                    });
                };
            });
        }

        // Get a new random index for passing to the quotes array

    }, {
        key: 'getNewQuote',
        value: function getNewQuote(state) {
            this.setState({ current: Math.floor(Math.random() * 103) });

            // If the random index is same as the previous one, call the function again (recursive)
            if (state.current == this.state.current) this.getNewQuote(this.state);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                error = _state.error,
                isLoaded = _state.isLoaded,
                quotes = _state.quotes,
                current = _state.current;


            if (error) {
                return React.createElement(
                    'div',
                    null,
                    'Error: ',
                    error.message
                );
            } else if (!isLoaded) {
                return React.createElement(
                    'div',
                    null,
                    'Loading...'
                );
            } else {
                var quote = quotes[current].quote;
                var author = quotes[current].author;
                var tweetText = encodeURIComponent(quote + ' - ' + author);
                return React.createElement(
                    'div',
                    { id: 'quote-box' },
                    React.createElement('i', { className: 'fas fa-quote-left' }),
                    React.createElement(
                        'div',
                        { id: 'text' },
                        quote
                    ),
                    React.createElement(
                        'div',
                        { id: 'author' },
                        '- ',
                        author
                    ),
                    React.createElement(
                        'button',
                        { id: 'new-quote', onClick: this.getNewQuote },
                        'New Quote'
                    ),
                    React.createElement(
                        'a',
                        { href: 'https://twitter.com/intent/tweet?text=' + tweetText + '&url=https://pratvar.com/fCC-projects/frontend-libs/random-quote',
                            target: '_blank', id: 'tweet-quote' },
                        React.createElement('i', { 'class': 'fab fa-twitter' }),
                        ' Tweet'
                    )
                );
            }
        }
    }]);

    return App;
}(React.Component);

var domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);