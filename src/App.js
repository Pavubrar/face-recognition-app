import React, { Component } from 'react';
import 'tachyons';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLink/imageLinkForm";
import Rank from "./components/rank/rank";
import FaceRecognition from './components/faceRecognition/faceRecognition';
import './App.css';
import Particles from 'react-particles-js'

const app = new Clarifai.App({
  apiKey: 'c554fc5b7b9e427dbe94aa5f639f489d'
});
const particlesOptions = {
  particles: {

    number: {
      value: 30,
      density: {

        enable: true,
        value_area: 200

      }
    }

  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: ''
    }
  }
  onInputChange = (event) => {
    
this.setState({input: event.target.value})
console.log(event.target.value)
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict( 
      Clarifai.COLOR_MODEL,this.state.input)
      .then(
      function (response) {
        console.log('click')
        console.log(response)
      },
      function (err) {
       console.log(err)
      }
    );
  }
  render() {

    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    )
  }
}

export default App;
