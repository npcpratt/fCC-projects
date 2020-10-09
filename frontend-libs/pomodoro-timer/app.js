var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _MaterialUI = MaterialUI,
    IconButton = _MaterialUI.IconButton,
    Button = _MaterialUI.Button,
    Fab = _MaterialUI.Fab;


'use strict';

var timer = null;
var leadingZero = function leadingZero(num) {
    if (num < 10) return '0' + num;
    return num;
};

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            breakLength: 5,
            sessionLength: 25,
            timerActive: false,
            current: 'Session',
            minLeft: '25',
            secLeft: '00'
        };
        _this.setLength = _this.setLength.bind(_this);
        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.timerFunc = _this.timerFunc.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'setLength',
        value: function setLength(name, value) {
            switch (name) {
                case 'break':
                    if (this.state.breakLength == 1 && value == -1 || this.state.breakLength == 60 && value == 1) break;else {
                        this.setState({ breakLength: this.state.breakLength + value });
                        break;
                    }
                case 'session':
                    if (this.state.sessionLength == 1 && value == -1 || this.state.sessionLength == 60 && value == 1) break;else {
                        this.setState({
                            sessionLength: this.state.sessionLength + value,
                            minLeft: leadingZero(parseInt(this.state.minLeft) + value)
                        });
                    }
            }
        }
    }, {
        key: 'timerFunc',
        value: function timerFunc() {
            // switch to break when session completes and vice versa, also play beep
            if (this.state.minLeft == '00' && this.state.secLeft == '00') {
                switch (this.state.current) {
                    case 'Session':
                        this.setState({
                            current: 'Break',
                            minLeft: this.state.breakLength
                        });break;
                    case 'Break':
                        this.setState({
                            current: 'Session',
                            minLeft: this.state.sessionLength
                        });
                }
                var beep = document.querySelector("#beep");
                beep.currentTime = 0;
                beep.play();
            }
            // countdown
            if (this.state.secLeft == '00') this.setState({
                minLeft: leadingZero(parseInt(this.state.minLeft) - 1),
                secLeft: '59'
            });else this.setState({
                secLeft: leadingZero(parseInt(this.state.secLeft) - 1)
            });
        }
    }, {
        key: 'start',
        value: function start() {
            timer = accurateInterval(1000, this.timerFunc);
            this.setState({ timerActive: true });
        }
    }, {
        key: 'stop',
        value: function stop() {
            timer.cancel();
            this.setState({ timerActive: false });
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (this.state.timerActive) timer.cancel();
            this.setState({
                breakLength: 5,
                sessionLength: 25,
                timerActive: false,
                current: 'Session',
                minLeft: '25',
                secLeft: '00'
            });
            document.querySelector('#beep').pause();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var timerActive = this.state.timerActive;
            return React.createElement(
                'div',
                { id: 'container' },
                React.createElement(
                    'div',
                    { className: 'duration', id: 'break' },
                    React.createElement(
                        'div',
                        { className: 'label', id: 'break-label' },
                        'Break Length'
                    ),
                    React.createElement(
                        'div',
                        { className: 'length-setter' },
                        React.createElement(
                            IconButton,
                            { onClick: function onClick() {
                                    _this2.setLength('break', -1);
                                }, id: 'break-decrement' },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'remove'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'length', id: 'break-length' },
                            this.state.breakLength
                        ),
                        React.createElement(
                            IconButton,
                            { onClick: function onClick() {
                                    _this2.setLength('break', 1);
                                }, id: 'break-increment' },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'add'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'duration', id: 'session' },
                    React.createElement(
                        'div',
                        { className: 'label', id: 'session-label' },
                        'Session Length'
                    ),
                    React.createElement(
                        'div',
                        { className: 'length-setter' },
                        React.createElement(
                            IconButton,
                            { onClick: function onClick() {
                                    _this2.setLength('session', -1);
                                }, id: 'session-decrement' },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'remove'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'length', id: 'session-length' },
                            this.state.sessionLength
                        ),
                        React.createElement(
                            IconButton,
                            { onClick: function onClick() {
                                    _this2.setLength('session', 1);
                                }, id: 'session-increment' },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'add'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'timer' },
                    React.createElement(
                        'div',
                        { id: 'timer-label' },
                        this.state.current
                    ),
                    React.createElement(
                        'div',
                        { id: 'time-left' },
                        this.state.minLeft + ':' + this.state.secLeft
                    ),
                    React.createElement(
                        'div',
                        { id: 'timer-controls' },
                        React.createElement(
                            Fab,
                            { variant: 'contained', color: 'primary', id: 'start-stop', onClick: !timerActive ? this.start : this.stop },
                            !timerActive ? React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'play_arrow'
                            ) : React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'pause'
                            )
                        ),
                        React.createElement(
                            Fab,
                            { variant: 'outlined', id: 'reset', onClick: this.reset },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'restore'
                            )
                        )
                    ),
                    React.createElement('audio', { id: 'beep', src: 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' })
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));