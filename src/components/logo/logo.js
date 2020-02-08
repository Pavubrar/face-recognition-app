import React from 'react';
import './logo.css';
import Rose from './rose.png'
import Tilt from 'react-tilt'
const Logo = () => {
    return ( 
        <div className= 'ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{max: 55}} style={{height: 250, width: 250 }} >
        <div className="Tilt-inner"> <img alt='logo' src= {Rose} /></div>
        </Tilt>
        </div>
     );
}
 
export default Logo;