import React from 'react';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
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
      box: {},
      route: 'signin',
      isSingnedIn: false,
      user: { 
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ""
      }
    }
  }


  loadUser = (data) =>{
    this.setState({
      user: { 
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
  }

    })
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



  onChangeRoute = (route) => {
    if(route==='signout'){
      this.setState({isSingnedIn:false});
    }else if(route==='home'){
      this.setState({isSingnedIn:true});
    }
    this.setState({route:route});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  displayFaceBox =(box)=> {
    
    this.setState({ box})
  }

  onButtonSubmit = () =>{
    const {input} = this.state
    this.setState({imageUrl : input})
    clarifaiApp.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response = response.JSON())
        .then(count =>{
          this.setState(Object.assign(this.state.user,{
            entries: count
          }))
        })
      }
    
      
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(error =>console.log(error))
  }
  
  render(){
    const { imageUrl, box, route, isSingnedIn }=this.state;
  return (
    <div className="App">
        <Particle />
        <Navigation isSingnedIn={isSingnedIn} onChangeRoute={this.onChangeRoute}/>  
         {route ==='home'
          ?<div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
           
           :(route === 'signin'
           ?<SignIn loadUser={this.loadUser} onChangeRoute={this.onChangeRoute}/>
           :<Register loadUser={this.loadUser} onChangeRoute={this.onChangeRoute}/>)
           
        
          }
    </div>

  );}

}
export default App;
