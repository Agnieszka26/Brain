import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Particle from "./Components/Particles/Particles";


const App = () => {
  return (
    <div className="App">
        <Particle />
        <Navigation />   
        <Rank />
        <ImageLinkForm />
        
    { /*
    <FaceRecognition />} */}
    </div>
  );

  }


export default App;
