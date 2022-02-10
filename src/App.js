// todo: this is class
// import {React, Component} from "react";
// import ReactDOM from "react-dom";
// import * as THREE from "three";

// class App extends Component {
//   componentDidMount() {
//       var scene = new THREE.Scene();
//       var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//       var renderer = new THREE.WebGLRenderer();
//       renderer.setSize( window.innerWidth, window.innerHeight );
//       this.mount.appendChild( renderer.domElement );
    
//       var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//       var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
//       var cube = new THREE.Mesh( geometry, material );
//       scene.add( cube );
//       const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//       scene.add( light );
      
//       camera.position.z = 2;
//       var animate = function () {
//           requestAnimationFrame( animate );
//           cube.rotation.x += 0.01;
//           cube.rotation.y += 0.01;
//           cube.rotation.z += 0.01;
//           renderer.render( scene, camera );
//       };
//       animate();
//   }
//   render() {
//       return (
//           <div ref={ref => (this.mount = ref)} />
//       )
//   }
// }
// const rootElement = document.getElementById("root")
// ReactDOM.render(<App />, rootElement);
// export default App;

// todo: this is function
import { useEffect, useRef } from "react";
import * as THREE from "three";
import waterImage from './textures/water.jpg'

const App = () => {

  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );
    mountRef.current.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 3, 3, 3 );
    var texture = new THREE.TextureLoader().load( waterImage );

    // var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    var material = new THREE.MeshBasicMaterial({map: texture})

    var cube = new THREE.Mesh( geometry, material );

    scene.add( cube );

    // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
    // scene.add(light)

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener("resize", onWindowResize, false);

    animate();

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return (
    <div ref={mountRef}>
        {/* <h1 style={{marginLeft: '10px', fontWeight: 900, fontSize: 30}}>YOUR METAVERSE PET</h1>     */}
    </div>
  );
}

export default App;