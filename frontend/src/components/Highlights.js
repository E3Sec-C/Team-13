import React from 'react';
import FlipCard from './flipcard/FlipCard';

const frontContent1 =  "Farewell2k24, Conducted by SRC"
const frontContent2 = "E3S1 Semester Results are released, Check now"
const frontContent3 = "AI/ML workshop on this saturday, join us"
const backContent1 = "Same backend content myan, Don't have enough time!"
const Highlights = () => {
    return (
        <>
            <h1>Branch <font style={{color:'blue'}}>Highlights</font></h1>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <FlipCard frontContent={frontContent1}  backContent={backContent1} />
                <FlipCard frontContent={frontContent2} backContent={backContent1} />
                <FlipCard frontContent={frontContent3} backContent={backContent1} />
            </div>
        </>
    );
};

export default Highlights;