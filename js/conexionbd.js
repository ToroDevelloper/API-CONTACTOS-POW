const mysql = require('mysql2/promise')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const pool = mysql.createPool({
    host: 'localhost',
    database: 'contactos',
    user: 'root',
    password: '',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
})

async function getFormData() {
    const [generos] = await pool.query('SELECT * FROM genero')
    const [direcciones] = await pool.query('SELECT * FROM direccion')
    const [tipos] = await pool.query('SELECT * FROM tipo_telefono')
    return { generos, direcciones, tipos }
}

app.get('/', async (req, res) => {
    try {
        const sql = `
            SELECT c.*, g.detalle_genero, d.detalle_direccion, t.detalle_tipo_telefono
            FROM contacto c
            INNER JOIN genero g ON c.id_genero = g.id_genero
            INNER JOIN direccion d ON c.id_direccion = d.id_direccion
            INNER JOIN tipo_telefono t ON c.id_tipo_telefono = t.id_tipo_telefono
            ORDER BY c.id_contacto ASC
        `
        const [contactos] = await pool.query(sql)
        res.render('index', { contactos })
    } catch (err) {
        console.error(err)
        res.status(500).send('Error interno')
    }
})

app.get('/crearcontacto', async (req, res) => {
    try {
        const data = await getFormData()
        res.render('crearcontacto', data)
    } catch (err) {
        console.error(err)
        res.status(500).send('Error interno')
    }
})

app.post('/contacto', async (req, res) => {
    try {
        const data = {}
        Object.keys(req.body).forEach(k => data[k] = req.body[k] === '' ? null : req.body[k])
        await pool.query('INSERT INTO contacto SET ?', data)
        res.redirect('/')
    } catch (err) {
        console.error(err)
        res.status(500).send('Error interno')
    }
})

app.get('/estadisticas', async (req, res) => {
    try {
        const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM contacto')
        const totalContactos = total
        const sqlBarrios = `
            SELECT 
                d.detalle_direccion as barrio,
                COUNT(c.id_contacto) as cantidad,
                ROUND((COUNT(c.id_contacto) * 100.0 / NULLIF(?, 0)), 2) as porcentaje
            FROM direccion d
            LEFT JOIN contacto c ON d.id_direccion = c.id_direccion
            GROUP BY d.id_direccion, d.detalle_direccion
            ORDER BY cantidad DESC
        `
        const [barrios] = await pool.query(sqlBarrios, [totalContactos])
        res.render('estadisticas', { barrios, totalContactos })
    } catch (err) {
        console.error(err)
        res.status(500).send('Error interno')
    }
})

app.listen(3000, () => console.log('Servidor en http://localhost:3000'))
