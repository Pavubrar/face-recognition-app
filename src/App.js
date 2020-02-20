import React, { Component } from 'react';
import 'tachyons';
//import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import SignIn from './components/signin/signin'
import Register from './components/signin/register'
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLink/imageLinkForm";
import Rank from "./components/rank/rank";
import FaceRecognition from './components/faceRecognition/faceRecognition';
import './App.css';
import Particles from 'react-particles-js'

// const app = new Clarifai.App({
//   apiKey: 'c554fc5b7b9e427dbe94aa5f639f489d'
// });
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
      imageUrl: '',
      faceBox: {},
      route: 'signin',
      isSignedIn: false
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('idinputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  }
  displayFaceBox = (boxData) => {
    this.setState({ faceBox: boxData });
  }
  onInputChange = (event) => {

    this.setState({ input: event.target.value })
    console.log(event.target.value)
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://betaface-face-recognition-v1.p.rapidapi.com/media", {
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "betaface-face-recognition-v1.p.rapidapi.com",
		"x-rapidapi-key": "2abea32974mshbf655ae7dbaa9bfp10fdbbjsn33f8697fbbe8",
		"content-type": "application/json",
		"accept": "application/json"
	},
	"body": {
		"file_uri": "http://betafaceapi.com/api_examples/sample.png",
		"detection_flags": "propoints,classifiers,content",
		"recognize_targets": [
			"all@celebrities.betaface.com"
		],
		"original_filename": "sample.png"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});
  }
  onRouteChange =(route) => {
    if (route === 'signout') {
      this.setState ({isSignedIn: false})
    }else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  render() {
    const {isSignedIn, imageUrl, route, faceBox} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'?
        <div>
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition faceBox={faceBox} imageUrl={imageUrl} />
      </div>
        : (
          route ==='signin'? 
          <SignIn onRouteChange ={this.onRouteChange}/>
          :<Register onRouteChange ={this.onRouteChange}/>
        )}
        </div>
    )
  }
}

export default App;
