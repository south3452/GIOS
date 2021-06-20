const vlan = require('./Switch/vlan.js');
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

 
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/views/index.html")  
})

app.post("/", (req, res) =>{
    var p = Promise.resolve(vlan(req.headers.vlan,req.headers.nome,req.headers.porta))
    p.then(() =>{ 
        res.download(__dirname + '/vlan.txt')
    })

})

app.listen(3000,() => {
    console.log('http://localhost:3000')
})


