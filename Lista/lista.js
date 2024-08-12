document.addEventListener('DOMContentLoaded', () => {
    const listaCompras = document.getElementById('lista-compras');
    const totalPrecio = document.getElementById('total-precio');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let sumaTotal = 0;

    if (carrito.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay productos en el carrito.';
        mensaje.classList.add('mensaje-vacio');
        listaCompras.appendChild(mensaje);
        totalPrecio.textContent = '0.00';
        return;
    }

    carrito.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <div class="caja">
                <img src="${item.imagen}" alt="${item.nombre}" class="imagen-caja">
            </div>
            <p>Nombre: ${item.nombre}</p>
            <p>Precio: $${item.precio}</p>
            <button class="boton-eliminar" data-index="${index}">Eliminar</button>
        `;
        listaCompras.appendChild(div);
        sumaTotal += parseFloat(item.precio); // Sumar el precio del producto
    });

    totalPrecio.textContent = sumaTotal.toFixed(2); // Mostrar la suma total con dos decimales

    // Manejar clics en el botón de eliminar
    listaCompras.addEventListener('click', (event) => {
        if (event.target.classList.contains('boton-eliminar')) {
            const index = event.target.dataset.index;
            carrito.splice(index, 1); // Eliminar el producto del array
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar localStorage
            location.reload(); // Recargar la página para actualizar la lista
        }
    });
});