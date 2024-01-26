// src/components/QuoteGenerator.js
import React, {useState, useEffect} from "react";
import {FaCopy} from "react-icons/fa";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      let data;
      do {
        const response = await fetch("https://api.quotable.io/random");
        data = await response.json();
      } while (data.content.split(" ").length > 15);

      setQuote(data.content);
      setAuthor(data.author);
      setIsCopied(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  const handleCopyQuote = () => {
    const textarea = document.createElement("textarea");
    textarea.value = `"${quote}" - ${author}`;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <div className="wrapper">
      <h1>Quote Generator</h1>
      <div>
        <blockquote>
          <span className="quote-text">{`"${quote}"`}</span>
          <div className="author"> - {author}</div>
          <div className="icon" onClick={handleCopyQuote}>
            <FaCopy />
          </div>
        </blockquote>
        {isCopied && <div className="feedback-overlay">Quote copied!</div>}
      </div>
      <button onClick={handleNewQuote}>New Quote</button>
    </div>
  );
};

export default QuoteGenerator;
