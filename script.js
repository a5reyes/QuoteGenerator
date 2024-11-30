import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advice: "",
      first_name: "",
      last_name: ""
    };
  }

  componentDidMount() {
    this.fetchAdvice();
    this.fetchName();
  }

  fetchAdvice = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.adviceslip.com/advice", true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        this.setState({ advice: data.slip.advice });
      } else {
        console.log("Error fetching advice");
      }
    };
    xhr.onerror = () => {
      console.log("Request failed");
    };
    xhr.send();
    
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "https://randomuser.me/api/", true);
    xhr2.onload = () => {
      if (xhr2.status === 200) {
        const data = JSON.parse(xhr2.responseText);
        this.setState({ 
          first_name: data.results[0]["name"]["first"],
          last_name: data.results[0]["name"]["last"]
        });
      } else {
        console.log("Error fetching advice");
      }
    };
    xhr2.onerror = () => {
      console.log("Request failed");
    };
    xhr2.send();
  };
  
  fetchName = () => {
    
  };
 

  render() {
    return (
      <div id="quote-box">
        <div>
          <h1 id="text">{this.state.advice}</h1>
          <h2 id="author" >-{this.state.first_name} {this.state.last_name}</h2>
          <button id="new-quote" onClick={this.fetchAdvice}>
            <span>New Quote</span>
          </button>
          <p></p>
          <button id="tweet-button">
            <span id="tweet">
          <a id="tweet-quote" href="twitter.com/intent/tweet">Tweet Quote</a>
            </span>
          </button>        
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));