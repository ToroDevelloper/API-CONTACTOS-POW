const mysql = require("mysql")
const express = require("express")
const app = express()

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
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

// Ruta principal - Ver contactos
app.get("/", (req, res) => {
    const sql = `SELECT c.*, g.detalle_genero, d.detalle_direccion, t.detalle_tipo_telefono
                 FROM contacto c
                          LEFT JOIN genero g ON c.id_genero = g.id_genero
                          LEFT JOIN direccion d ON c.id_direccion = d.id_direccion
                          LEFT JOIN tipo_telefono t ON c.id_tipo_telefono = t.id_tipo_telefono`

    conexion.query(sql, (err, contactos) => {
        if (err) throw err
        res.render("index", { contactos })
    })
})

// Ruta para crear contacto - mostrar formulario
app.get("/crearcontacto", (req, res) => {
    conexion.query("SELECT * FROM genero", (e1, generos) => {
        conexion.query("SELECT * FROM direccion", (e2, direcciones) => {
            conexion.query("SELECT * FROM tipo_telefono", (e3, tipos) => {
                res.render("crearcontacto", { generos, direcciones, tipos })
            })
        })
    })
})

// API - Ver contactos (JSON)
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

// API - Datos para formulario (JSON)
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
    // Excluir id_contacto y limpiar datos vacíos
    const { id_contacto, ...rawData } = req.body

    // Convertir strings vacíos a null
    const data = {}
    for (let key in rawData) {
        if (rawData[key] === "" || rawData[key] === undefined) {
            data[key] = null
        } else {
            data[key] = rawData[key]
        }
    }

    const sql = "INSERT INTO contacto SET ?"
    conexion.query(sql, data, (err, result) => {
        if (err) {
            console.error("Error al crear contacto:", err)
            return res.status(500).json({ error: err.message })
        }
        res.redirect("/")
    })
})

// Agregar esta ruta en conexionbd.js después de las rutas existentes

// Ruta para estadísticas de contactos por barrio
app.get("/estadisticas", (req, res) => {
    // Primero obtener el total de contactos
    const sqlTotal = "SELECT COUNT(*) as total FROM contacto"

    conexion.query(sqlTotal, (err, totalResult) => {
        if (err) throw err

        const totalContactos = totalResult[0].total

        // Luego obtener contactos por barrio
        const sqlBarrios = `
            SELECT 
                d.detalle_direccion as barrio,
                COUNT(c.id_contacto) as cantidad,
                ROUND((COUNT(c.id_contacto) * 100.0 / ?), 2) as porcentaje
            FROM direccion d
            LEFT JOIN contacto c ON d.id_direccion = c.id_direccion
            GROUP BY d.id_direccion, d.detalle_direccion
            ORDER BY cantidad DESC
        `

        conexion.query(sqlBarrios, [totalContactos], (err, barrios) => {
            if (err) throw err

            res.render("estadisticas", {
                barrios,
                totalContactos
            })
        })
    })
})

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000")
})