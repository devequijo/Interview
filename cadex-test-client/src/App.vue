<script>
import * as THREE from 'three'

export default {
  name: 'App',
  data() { return{
  			scene:null,
				renderer:null,
				shape: null,
				geometry: null, 	
				material: null,
				mouseRotate: false,    
  }},
  methods:{

    preventCamRotation(){
        this.shape.rotation.x = 0;
        this.shape.rotation.y = 0;
        this.shape.rotation.z = 1;
      },
    mouseStuff(e){
        if (this.mouseRotate) {
        this.shape.rotation.y = e.offsetX/20
        this.shape.rotation.x = e.offsetY/20
        this.renderer.render( this.scene, this.camera)
      }
    },
    changeStuff(){
        this.shape.rotation.z+=0.1
        this.shape.rotation.x+=0.1
        this.shape.rotation.x+=0.1
        this.renderer.render( this.scene, this.camera );
      },
    camhanddle(){
        document.getElementById('render').removeChild(document.querySelector('canvas'))
        this.init()
			},
    init() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.getWidth-50, this.getHeight-200 );
        //document.body.appendChild( renderer.domElement );
        document.getElementById('render').appendChild(this.renderer.domElement)
        this.geometry = new THREE.ConeGeometry(3, 8, 20);
        this.material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
        this.shape = new THREE.Mesh( this.geometry, this.material )
        this.scene.add( this.shape );
        this.camera.position.z = 8;
        this.shape.rotation.x += 1.51;
        this.shape.rotation.y += 0.91;
        this.shape.rotation.z += 5.4;
        this.renderer.render( this.scene, this.camera );

}

  },
  computed: {
    getWidth(){
      return window.innerWidth
    },
    getHeight(){
      return window.innerHeight
    },
    camera() {
      return new THREE.PerspectiveCamera( 75, this.getWidth / this.getHeight, 0.1, 5000 );
    },
  created() {
   // window.addEventListener("resize", this.camhanddle($event));
      },      
  },
  mounted(){
    this.init()
  }
}
  

</script>

<template>
  <div id="app">
    <div id="render" @mousemove="mouseStuff($event)"></div>
    	<div class="control">

        <label for="mouseRotate">Transform mouse</label>
        <input  v-model='mouseRotate' @click="preventCamRotation" type="checkbox" id="mouseRotate">
        <button class="btn btn-primary">Save this shape!</button>
        <label for="radius">Radius:</label>
        <input type="number" id="radius">
        <label for="radius">Height:</label>
        <input type="number" id="height">
        <label for="radius">Radial segments:</label>
        <input type="number" id="radialSegments">
	    </div>
  </div>
</template>



<style>
#render{
  float:left;
  position:relative;
  left:50%
}
canvas{
  float:left;
  position:relative;
  left:-50%
}
body{
  background-color:black;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
</style>
