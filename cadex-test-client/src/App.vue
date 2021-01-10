<script>
import * as THREE from 'three'
import axios from 'axios'
import { Vector2, Vector3 } from 'three'
export default {
  name: 'App',
  data() { return{
        models:[],
        radius:3,
        height:8,
        radialSegments:20,
        triangulation:null,
        result:null,
  			scene:null,
				renderer:null,
				shape: null,
				geometry: null, 	
				material: null,
        mouseRotate: false,    
        stuff:false
  }},
  methods:{

    getTriangulation(){
      axios({
        method:'post',
        url: 'http://localhost:8000',
        data: {
          radius: this.radius>0?this.radius:1,
          height: this.height,
          radialSegments: this.radialSegments,
        },
      }).then(result=>{
          this.triangulation = result.data
        })
    },
    saveModel(){
      console.log(this.models)
      this.models.push({ radius:this.radius, height:this.height, radialSegments:this.radialSegments,'index':this.models.length+1})
    },
    preventCamRotation(){
      //not sure if this part have sense but seems to b working
        this.shape.rotation.x = 0;
        this.shape.rotation.y = 0;
        this.shape.rotation.z = 0;
      },
  
    mouseStuff(e){
        if (this.mouseRotate) {
        this.shape.rotation.y = e.offsetX/20
        this.shape.rotation.z = e.offsetY/20
        this.renderer.render( this.scene, this.camera)
      }
    },
    camhanddle(){
      	this.camera.aspect = this.getWidth / this.getHeight;
				this.camera.updateProjectionMatrix();
        document.getElementById('render').removeChild(document.querySelector('canvas'))
        this.init()
      },
    triangulate(i){
         //this.radius = this.models[i].radius
         console.log[i]
        // console.log(this.models[i+1])
      },
 
    init() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.getWidth-50, this.getHeight-200 );
        document.getElementById('render').appendChild(this.renderer.domElement)
        this.geometry = new THREE.ConeGeometry(3, 8, 500);
        console.log(this.geometry)
        this.material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
        this.shape = new THREE.Mesh( this.geometry, this.material )
        this.shape.verticesNeedUpdate=true
        this.scene.add( this.shape );
        this.camera.position.z = 10;
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
  },
  watch:{
    triangulation: function(){
       this.shape.geometry.faces = this.triangulation.faces
       this.shape.geometry.elementsNeedUpdate=true
       this.shape.geometry.faceVertexUvs = []
       this.shape.geometry.faceVertexUvs = {...this.triangulation.faceVertexUvs}
    // this.shape.geometry.vertices = this.triangulation.vertices
      for(let i =0 ; i<this.triangulation.vertices.length;i++){
          this.shape.geometry.vertices[i] = new THREE.Vector3(this.triangulation.vertices[i].x, this.triangulation.vertices[i].y, this.triangulation.vertices[i].z)
          this.shape.geometry.verticesNeedUpdate=true
        }
        this.scene.remove(this.shape)
    //  this.shape= new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.shape)
        this.renderer.render( this.scene, this.camera );
    //  console.log(this.shape.geometry)
    }
    
  },
  mounted(){
    this.init()
  //  window.addEventListener("resize", this.camhanddle())
  }
}
</script>
<template>
  <div id="app">
    <div id="render" @click="getTriangulation()" @mousemove="mouseStuff($event)"></div>
    	<div class="control">
      
        
        <label for="mouseRotate">Transform mouse</label>
        <input  v-model='mouseRotate' @click="preventCamRotation" type="checkbox" id="mouseRotate">
        <form @change="getTriangulation()">
        <div><label for="radius">Radius:</label>
        <input v-model="radius"  type="number" id="radius">
        <label for="height">Height:</label>
        <input v-model="height" type="number" id="height">  
        <div>
        <label for="radialSegments">Radial segments:{{radialSegments}}</label>
        <input v-model="radialSegments" type="range" min="2" max="100" class="slider" id="myRange">
        </div></div></form>
        <button @click="saveModel()">Save model</button>
        <ul v-for="model in models" :key="model.index">
          <li><button @click="triangulate(model.index)">Render</button>{{` Radius:${model.radius}, Height:${model.height}, Radial segments:${model.radialSegments}`}}</li>
        </ul>

	    </div>
  </div>
</template>
<style>
ul{list-style-type:none}
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