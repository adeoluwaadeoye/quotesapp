import React from "react";

const Quote = ({ quote }) => {
    return (
        <div className="quote">
            <p className="content">"{quote.content}"</p>
            <p className="author">- {quote.author}</p>
        </div>
    );
};

export default Quote;
