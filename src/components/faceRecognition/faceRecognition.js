import React from 'react';
const  FaceRecognition  = ({imageUrl, faceBox}) => {
    return ( 
        <div className='center ma'>
        <div className='absolute mt2' >
<img id='idinputimage' src={imageUrl} alt='pic' width='500px' height='auto' />
<div className='bounding-box' style={{ top: faceBox.topRow, right: faceBox.rightCol, bottom: faceBox.bottomRow, left: faceBox.leftCol }}></div>
        </div>
        </div>
     );
}
 
export default FaceRecognition ;