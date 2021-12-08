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
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) =>{
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol:  clarifyFace.left_col * width,
      topRow: clarifyFace.top_row *height,
      rightCol: width - (clarifyFace.right_col *width),
      bottomRow: height-(clarifyFace.bottom_row * height)
    }
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  displayFaceBox =(box)=> {
    
    this.setState({ box})
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl : this.state.input})
    clarifaiApp.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    )
    .then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))     
    .catch(error =>console.log(error))
  }
  
  render(){

  
  return (
    <div className="App">
        <Particle />
        <Navigation />   
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        
 
    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
  );

  }

}
export default App;
