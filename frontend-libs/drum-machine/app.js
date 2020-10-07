'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keys = [{ keyCode: 113, keyTrigger: 'Q', id: 'Chord-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' }, { keyCode: 119, keyTrigger: 'W', id: 'Chord-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' }, { keyCode: 101, keyTrigger: 'E', id: 'Chord-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' }, { keyCode: 97, keyTrigger: 'A', id: 'Shaker', url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' }, { keyCode: 115, keyTrigger: 'S', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' }, { keyCode: 100, keyTrigger: 'D', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' }, { keyCode: 122, keyTrigger: 'Z', id: 'Punchy-Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' }, { keyCode: 120, keyTrigger: 'X', id: 'Side-Stick', url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' }, { keyCode: 99, keyTrigger: 'C', id: 'Snare', url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			volume: 5
		};
		_this.playSound = _this.playSound.bind(_this);
		_this.volumeControl = _this.volumeControl.bind(_this);
		_this.handleKeyPress = _this.handleKeyPress.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('keypress', this.handleKeyPress);
			document.getElementById('display').innerHTML = '-';
		}
	}, {
		key: 'playSound',
		value: function playSound(key) {
			// play sound
			var sound = document.getElementById(key.keyTrigger);
			sound.volume = this.state.volume / 10;
			sound.currentTime = 0;
			sound.play();

			// display key name
			document.querySelector('#display').innerHTML = key.id.replace(/-/g, ' ');

			// keypress animation
			var div = document.getElementById(key.id);
			div.style.background = '#0288D1';
			setTimeout(function () {
				div.style.background = '#01579B';
			}, 200);
		}
	}, {
		key: 'volumeControl',
		value: function volumeControl(e) {
			this.setState({
				volume: e.target.value
			});
		}
	}, {
		key: 'handleKeyPress',
		value: function handleKeyPress(e) {
			for (var i = 0; i < keys.length; i++) {
				if (e.keyCode == keys[i].keyCode) {
					this.playSound(keys[i]);
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				{ id: 'drum-machine' },
				React.createElement('div', { id: 'display' }),
				keys.map(function (key) {
					return React.createElement(
						'div',
						{ className: 'drum-pad', id: key.id, onClick: function onClick() {
								return _this2.playSound(key);
							} },
						React.createElement('audio', { className: 'clip', id: key.keyTrigger, src: key.url }),
						key.keyTrigger
					);
				}),
				React.createElement(
					'div',
					{ id: 'sliderContainer' },
					'Volume: ',
					React.createElement('input', { type: 'range', min: '1', max: '10', value: this.state.volume, onChange: this.volumeControl })
				)
			);
		}
	}]);

	return App;
}(React.Component);

var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(App, null), domContainer);