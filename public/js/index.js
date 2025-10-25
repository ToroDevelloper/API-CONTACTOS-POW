// Cargar contactos
fetch("/contactos")
    .then(r => r.json())
    .then(data => {
        const tbody = document.getElementById("tbody")
        data.forEach(c => {
            tbody.innerHTML += `
                <tr>
                    <td>${c.id_contacto}</td>
                    <td>${c.primer_nombre} ${c.segundo_nombre || ''} ${c.primer_apellido} ${c.segundo_apellido || ''}</td>
                    <td>${c.detalle_genero || ''}</td>
                    <td>${c.detalle_direccion || ''}</td>
                    <td>${c.telefono || ''}</td>
                    <td>${c.email || ''}</td>
                </tr>
            `
        })
    })
    .catch(err => console.error("Error al cargar contactos:", err))