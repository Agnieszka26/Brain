import React from "react";

import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () =>{
    return(
        <div className='ma4 pa3 mt0'>
            <Tilt  className="Tilt br2 shadow-2" style ={{width:'100px', height:'100px' }} >
                <div className='pa3' style ={{ transitionSpeed:'1000', scale:'100', glareColor:'#f472cd', flipVertically:'true' }} >
                    <img src={brain} alt="logo" />
                </div>
            </Tilt>
        </div>
        
    );
}

export default Logo;