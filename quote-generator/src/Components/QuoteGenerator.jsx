import React, {Component} from "react";
import Quote from "./Quote";

class QuoteGenerator extends Component {
  constructor() {
    super();
    this.state = {
      currentQuote: null,
    };
  }

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        this.setState({currentQuote: data});
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  render() {
    const {currentQuote} = this.state;

    return (
      <div className="quote-generator">
        {currentQuote && <Quote quote={currentQuote} />}
        <div>
          <button onClick={this.fetchQuote}>Generate Quote</button>
        </div>
      </div>
    );
  }
}

export default QuoteGenerator;
