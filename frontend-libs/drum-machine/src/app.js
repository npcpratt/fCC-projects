'use strict';

const keys = [
	{ keyCode: 113, keyTrigger: 'Q', id: 'Chord-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
	{ keyCode: 119, keyTrigger: 'W', id: 'Chord-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
	{ keyCode: 101, keyTrigger: 'E', id: 'Chord-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
	{ keyCode: 97, keyTrigger: 'A', id: 'Shaker', url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
	{ keyCode: 115, keyTrigger: 'S', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
	{ keyCode: 100, keyTrigger: 'D', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
	{ keyCode: 122, keyTrigger: 'Z', id: 'Punchy-Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
	{ keyCode: 120, keyTrigger: 'X', id: 'Side-Stick', url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
	{ keyCode: 99, keyTrigger: 'C', id: 'Snare', url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 5
		}
		this.playSound = this.playSound.bind(this);
		this.volumeControl = this.volumeControl.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	componentDidMount() {
		document.addEventListener('keypress', this.handleKeyPress)
	}

	playSound(key) {
		const sound = document.getElementById(key.keyTrigger);
		const display = document.querySelector('#display');
		sound.currentTime = 0;
		sound.volume = this.state.volume/10;
		sound.play();
		display.innerHTML = key.id.replace(/-/g, ' ');
	}
	volumeControl(e) {
		this.setState({
			volume: e.target.value
		})
	}
	handleKeyPress(e) {
		for(let i = 0; i < keys.length; i++) {
			if(e.keyCode == keys[i].keyCode) {
				this.playSound(keys[i])
			}
		}
	}


    render() {
        return (
            <div id="drum-machine">
				<div id="display"></div>
				{keys.map((key, i, arr) => {
					return (
						<div className="drum-pad" id={key.id} onClick={() => this.playSound(key)}>
							<audio id={key.keyTrigger} src={key.url}></audio>{key.keyTrigger}
						</div>
					)
				})}
				<div id="sliderContainer">
					Volume: <input type="range" min="1" max="10" value={this.state.volume} onChange={this.volumeControl}/>
				</div>
			</div>
        )
    }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);