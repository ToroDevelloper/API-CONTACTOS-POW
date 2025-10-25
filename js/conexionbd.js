const mysql=require("mysql")
const express=require("express")
const path=require("path")
const app=express()




let conexion=mysql.createConnection({
    host:"localhost",
    database:"contactos",
    user:"root",
    password:"",
})

conexion.connect(function(err){
    if(err){
        throw err   
    }else{
        console.log("conexion exitosa")
    }
})


app.use(express.static("public"))

app.get("/crearcontacto",(req,res)=>{
    res.render("crearcontacto.html")
})

app.get("/contactos",(req,res)=>{
const consulta="SELECT * FROM  contacto INNER JOIN genero  ON ( contacto.id_genero = genero.id_genero )"
conexion.query(consulta,(err,respuesta)=>{
    if(err){
        throw err
    }else{
        res.json(respuesta)
        
    }
})

})

app.listen(3000,()=>{
    console.log("servidor activo en http://localhost:3000")
})

