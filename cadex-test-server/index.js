const { urlencoded, json } = require('express')
const three = require('./lib/three')
require('express')()
.use(urlencoded({extended:false})).use(json()).use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()}).post('*', (req,res)=>{
  
    const args = {...req.body}
    const geo={...new three.ConeGeometry(parseInt(args.radius), parseInt(args.height), parseInt(args.radialSegments))}
    console.log(geo)
    res.send(geo)
}).listen(8000, ()=>console.log('алётут'))