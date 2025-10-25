// Cargar datos para los select
fetch('/datos')
    .then(r => r.json())
    .then(data => {
        const genero = document.getElementById('genero')
        const direccion = document.getElementById('direccion')
        const tipo = document.getElementById('tipo')

        data.generos.forEach(g => {
            genero.innerHTML += `<option value="${g.id_genero}">${g.detalle_genero}</option>`
        })

        data.direcciones.forEach(d => {
            direccion.innerHTML += `<option value="${d.id_direccion}">${d.detalle_direccion}</option>`
        })

        data.tipos.forEach(t => {
            tipo.innerHTML += `<option value="${t.id_tipo_telefono}">${t.detalle_tipo_telefono}</option>`
        })
    })
    .catch(err => console.error("Error al cargar datos:", err))

// Enviar formulario
const form = document.getElementById('form')
form.addEventListener('submit', e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form))

    fetch('/contacto', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
        .then(r => r.json())
        .then(() => {
            alert('Contacto creado exitosamente')
            location.href = 'index.html'
        })
        .catch(err => {
            alert('Error al crear contacto')
            console.error(err)
        })
})