const mysql = require("mysql2")
const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: "localhost",
    database: "contactos",
    user: "root",
    password: "",
    port: 3306
})

db.connect((err) => {
    if (err) throw err
    console.log("Conectado a la base de datos")
})

function getFormData(callback) {
    db.query("SELECT * FROM genero", (err1, generos) => {
        db.query("SELECT * FROM direccion", (err2, direcciones) => {
            db.query("SELECT * FROM tipo_telefono", (err3, tipos) => {
                callback({ generos, direcciones, tipos })
            })
        })
    })
}

app.get("/", (req, res) => {
    const sql = `
        SELECT c.*, g.detalle_genero, d.detalle_direccion, t.detalle_tipo_telefono
        FROM contacto c
        INNER JOIN genero g ON c.id_genero = g.id_genero
        INNER JOIN direccion d ON c.id_direccion = d.id_direccion
        INNER JOIN tipo_telefono t ON c.id_tipo_telefono = t.id_tipo_telefono
    `

    db.query(sql, (err, contactos) => {
        if (err) throw err
        res.render("index", { contactos })
    })
})


app.get("/crearcontacto", (req, res) => {
    getFormData((data) => {
        res.render("crearcontacto", data)
    })
})

app.post("/contacto", (req, res) => {
    const data = {}


    Object.keys(req.body).forEach(key => {
        data[key] = req.body[key] === '' ? null : req.body[key]
    })

    const sql = "INSERT INTO contacto SET ?"
    db.query(sql, data, (err, result) => {
        if (err) throw err
        res.redirect("/")
    })
})

app.get("/estadisticas", (req, res) => {

    const sqlTotal = "SELECT COUNT(*) as total FROM contacto"

    db.query(sqlTotal, (err, totalResult) => {
        if (err) throw err

        const totalContactos = totalResult[0].total

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

        db.query(sqlBarrios, [totalContactos], (err, barrios) => {
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