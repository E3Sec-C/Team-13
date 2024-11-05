import React, { useState } from 'react';
import './flipcard.css';

const FlipCard = ({ frontContent, backContent }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    {frontContent}
                    <br/><br/><br/>
                    <p style={{marginBottom:'2px'}}>Click to view</p>
                </div>
                <div className="flip-card-back">
                    {backContent}
                    <br/><br/><br/>
                    <p style={{marginBottom:'2px'}}>Click again</p>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
