'use strict';

const e = React.createElement;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            quotes: [],
            current: Math.floor(Math.random()*103)
        }
        this.getNewQuote = this.getNewQuote.bind(this)
    }

    // Fetch quotes from freeCodeCamp's quotes.json file
    componentDidMount() {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    quotes: result.quotes
                }),
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            });
    }

    // Get a new random index for passing to the quotes array
    getNewQuote(state) {
        this.setState({current: Math.floor(Math.random()*103)});

        // If the random index is same as the previous one, call the function again (recursive)
        if (state.current == this.state.current) this.getNewQuote(this.state);
    }

    render() {
        
        const {error, isLoaded, quotes, current} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="quote-box">
                    <i className="fas fa-quote-left"></i>
                    <div id="text">{quotes[current].quote}</div>
                    <div id="author">- {quotes[current].author}</div>
                    <button id="new-quote" onClick={this.getNewQuote}>New Quote</button>
                    <a href={'https://twitter.com/intent/tweet?text='
                            + quotes[current].quote + ' - ' + quotes[current].author
                            + '&url=https://pratvar.com/fCC-projects/frontend-libs/random-quote'} 
                       target="_blank" id="tweet-quote"><i class="fab fa-twitter"></i> Tweet</a>
                </div>
            );
        }
    }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);