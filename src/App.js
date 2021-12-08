import React from 'react';
import './App.css';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Particle from "./Components/Particles/Particles";
import { Component } from 'react';
import Clarifai from 'clarifai';

const clarifaiApp = new Clarifai.App({
 apiKey: '320e122602804d35b58b0e94b53ed72d'
});


class App extends Component{
  constructor(){
    super();
    this.state ={
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }


  onButtonSubmit = () =>{
    this.setState({imageUrl : this.state.input})
    clarifaiApp.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    )
    .then(
      function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      
      },
      function(error){
        
      }
    )
  }
  
  render(){

  
  return (
    <div className="App">
        <Particle />
        <Navigation />   
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        
 
    <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );

  }

}
export default App;
