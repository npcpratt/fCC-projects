'use strict';

const e = React.createElement;

// fetch quotes from freeCodeCamp json
var quotesData = [];
fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(res => res.json())
    .then(result => {
        quotesData = result.quotes;
    });

// get random quote

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: quotesData.quotes
        };
    }
    render() {
        console.log(this.state.quotes);
        return (
            <div id="quote-box">
                <i className="fas fa-quote-left"></i>
                <div id="text">asdf</div>
                <div id="author">asdf</div>
                <button id="new-quote">New Quote</button>
                <a href="twitter.com" id="tweet-quote"><i class="fab fa-twitter"></i> Tweet</a>
            </div>
        );
    }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);