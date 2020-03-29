import React, { Component } from 'react';
import 'tachyons';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import SignIn from './components/signin/signin'
import Register from './components/signin/register'
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
      imageUrl: '',
      faceBox: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id:'',
        name: '',
        email: '',
        password: '',
        entries: '' ,
        joined: ''
      }
    }
  }
  loadUser = (data) => {
    this.setState( {
        id:data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries ,
        joined: data.joined
    })
  }
  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(console.log)
  // }
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
//  async componentDidMount(){
//    const url ='';
//   const response = await fetch(url);
//   const data = await response.json();
//   this.setState({})
//  }
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL_MODEL, 
      this.state.input)
    .then(response => {
      if(response) {
        fetch('http://localhost:3000/image', {
          method:'put',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
               id:this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
        this.displayFaceBox(this.calculateFaceLocation(response))
    })
  .catch(err => console.log(err));
  }
  
    // fetch()
//     fetch("https://betaface-face-recognition-v1.p.rapidapi.com/media", {
// 	"method": "POST",
// 	"headers": {
// 		"x-rapidapi-host": "betaface-face-recognition-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "2abea32974mshbf655ae7dbaa9bfp10fdbbjsn33f8697fbbe8",
// 		"content-type": "application/json",
// 		"accept": "application/json"
// 	},
// 	"body": {
// 		"file_uri": "http://betafaceapi.com/api_examples/sample.png",
// 		"detection_flags": "propoints,classifiers,content",
// 		"recognize_targets": [
// 			"all@celebrities.betaface.com"
// 		],
// 		"original_filename": "sample.png"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });
  
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
        {route === 'home'?
        <div>
        <Logo />
        <Rank 
        name={this.state.user.name} 
        entries={this.state.user.entries} 
        />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition faceBox={faceBox} imageUrl={imageUrl} />
      </div>
        : (
          route ==='signin'? 
          <SignIn loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/>
          :<Register loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/>
        )}
        </div>
    )
  }
}

export default App;
