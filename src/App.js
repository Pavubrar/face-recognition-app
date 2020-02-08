import React from 'react';
import 'tachyons';
import Navigation from './components/navigation/navigation';
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLink/imageLinkForm";
import Rank from "./components/rank/rank";
import './App.css';
import Particles  from 'react-particles-js'
const particlesOptions ={
  particles: {
    
      number:{
value: 30,
density:{

  enable: true,
  value_area:200

}
      }
    
}
} 

function App() {
  return (
    <div className="App">
    <Particles className='particles'
                params={particlesOptions} />
     <Navigation />
      <Logo />
      <Rank />
     <ImageLinkForm />
     {/* <FaceRecognitionForm /> */}
    </div>
  );
}

export default App;
