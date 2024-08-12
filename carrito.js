document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.boton-agregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const producto = event.target.closest('.producto');
            const nombre = producto.querySelector('img').alt; // Obtener nombre si no está directamente en el DOM
            const precio = producto.querySelector('span.precio').textContent.replace('$', ''); // Obtener precio
            const imagen = producto.querySelector('img').src; // Obtener la URL de la imagen

            const item = {
                nombre: nombre,
                precio: precio,
                imagen: imagen 
            };

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            // Verificar si el producto ya está en el carrito
            const existeProducto = carrito.some(producto => producto.nombre === item.nombre);

            if (existeProducto) {
                alert('Este producto ya está en el carrito.');
                return; // Salir de la función si el producto ya está en el carrito
            }

            carrito.push(item);
            localStorage.setItem('carrito', JSON.stringify(carrito));

            alert('Producto agregado al carrito');
        });
    });
});