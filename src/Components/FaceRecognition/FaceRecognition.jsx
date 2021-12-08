import React from 'react';



const FaceRecognition =({imageUrl, box}) =>{
    return(
        <div className='center ma'>
            <div className="absolute mt2 ">
            
            <img id='inputimage' src={imageUrl} alt="" width='500px' height='auto' />
            <div className="bounding-box" style={{position: 'absolute',
	top: box.topRow,
	right: box.rightCol,
	bottom: box.bottomRow,
	left: box.leftCol,
	boxShadow: '0 0 0 3px #149df2 inset',
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	cursor: 'pointer'}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;