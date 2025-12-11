/*----Datos: ahora viene de una API*/
let productos = [];// Arranca vacío, esperando al "mozo"
// --CARRITO(estado global)--
// Intentamos leer del LocalStorage.Si no hay nada, arrancamos con array vacio.
//JSON.parse convierte el texto guardamos de vuelta a un array de js 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
/* ---FUNCIONES --- */

//1. Guardar en LocalStorage
function guardarCarrito() {
    //JSON.strigify convierte el Array a texto para poder guardarlo
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();//cada vez que guardamos, actualizamos el numero de pantalla 
}

//actualizar el nro de menú 
function actualizarContador(){
    const contadorElement = document.getElementById("carrito-contador");
    contadorElement.textContent = `🛒 Carrito: ${carrito.length}`;
}
//agregar producto
function agregarAlCarrito(idProducto) {
    //buscamos el producto completo en nuestra lista "base de datos"
    const productoEncontrado = productos.find(p => p.id === idProducto);

    if (productoEncontrado) {
        carrito.push(productoEncontrado);//Lo metemos al array
        guardarCarrito();// Guardamos en la memoria del navegador
        alert(`¡${productoEncontrado.nombre} agregado`);
    }
}
//--API:Consumo de datos con Asynt/Await
async function obtenerProductosDeAPI() {
    try {
        //le decimos al código: "Esperá a que fech traiga los datos"
        const respuesta = await fetch(`https://fakestoreapi.com/products`);
        //2. una vez que llegaron, le decimos:Esperá a convertirlo a JSON
        const data = await respuesta.json();

        //3.Guardamos y dibujamos(esto pasa si o si desp de lo anterior)
        productos = data;
        renderizarProductos();
    } catch (error) {
        //si algo falla en el cambio, caemos acá (manejo de errores)
        console.error("Hubo un error al traer los productos:" ,error);
        alert("Hubo un problema cargando el catálogo. Intente más tardes.")
    }
  

}
//4.Rendirizar (Dibujar ) productos
function renderizarProductos() {
    const contenedor = document.querySelector(".contenedor-productos");
    contenedor.innerHTML = "";

    productos.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        //cambio clave
        tarjeta.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p class="precio">${producto.price}</p>
            <button class="boton-agregar" data-id=${producto.id}>Agregar al Carrito</button>
        `;
        contenedor.appendChild(tarjeta);
        
    });
    //una vez dibujado, activamos los botones
    activarBotones();
}
//5. Activar botones (Event Listener)
function activarBotones() {
    const botones = document.querySelectorAll(".boton-agregar");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            //Leemos el ID del producto desde el atributo data-id del botón
            const id = parseInt(e.target.getAttribute("data-id"));
            agregarAlCarrito(id);
        });
    });
}
//INICIO (Main)
//Ejecutamos todo al cargar la página
obtenerProductosDeAPI();//Primero buscamos los datos, y la funcion se encarga de renderizar despues
actualizarContador();//para que si recargás,muestre el numero correcto de una 