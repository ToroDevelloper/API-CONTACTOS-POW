const mysql = require("mysql")
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static("public/vistas"))
app.use("/estilos", express.static("public/estilos"))
app.use("/js", express.static("public/js"))

let conexion = mysql.createConnection({
    host: "localhost",
    database: "contactos",
    user: "root",
    password: ""
})

conexion.connect(function(err) {
    if (err) throw err
    console.log("Conexión exitosa")
})

// Ver contactos
app.get("/contactos", (req, res) => {
    const sql = `SELECT c.*, g.detalle_genero, d.detalle_direccion, t.detalle_tipo_telefono
                 FROM contacto c
                          LEFT JOIN genero g ON c.id_genero = g.id_genero
                          LEFT JOIN direccion d ON c.id_direccion = d.id_direccion
                          LEFT JOIN tipo_telefono t ON c.id_tipo_telefono = t.id_tipo_telefono`

    conexion.query(sql, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

// Datos para formulario
app.get("/datos", (req, res) => {
    conexion.query("SELECT * FROM genero", (e1, generos) => {
        conexion.query("SELECT * FROM direccion", (e2, direcciones) => {
            conexion.query("SELECT * FROM tipo_telefono", (e3, tipos) => {
                res.json({ generos, direcciones, tipos })
            })
        })
    })
})

// Crear contacto
app.post("/contacto", (req, res) => {
    const sql = "INSERT INTO contacto SET ?"
    conexion.query(sql, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err })
        res.json({ success: true })
    })
})

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000")
})