//DATOS (Simulando una base de datos ) 
//Usamos un array de objetos(Conceptos vistos )
const productos = [
    {
        nombre: "Teclado Gamer",
        precio: 50000,
        imagen: "https://placehold.co/150"
    },
    {
        mouse: "Mouse Óptico",
        precio: 25000,
        imagen: "https://placehold.co/150"
    },
    {
        mouse: "Mouse Óptico",
        precio: 180000,
        imagen: "https://placehold.co/150"
    },
    {
        mouse: "Auriculares RGB",
        precio: 40000,
        imagen: "https://placehold.co/150"
    },
];
// Lógica
//Definimos una función que se encarga de "dibijar" los productos 
function renderizarProductos() {
    //1.Capturamos el contenedor donde van a ir las tarjetas
    const contenedor = document.querySelector(".contenedor-productos");

    //2.Iteramos sobre el array de productos
    //Usamos forEach para recorrer cada producto de la lista
    productos.forEach((producto) => {
        // creamos el div de la tarjeta 
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        //llenamos la tarjeta con HTML dinamico usando los datos del objetos
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt=""${producto.nombre}>
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio}</p>
            <button class="boton-agregar">Agregar al Carrito</button>
        `;

        //Agregamos la tarjeta al contenedor padre
        contenedor.appendChild(tarjeta);    
         
    });
}
//3. Ejecutamos la función
renderizarProductos();
// ITERACIÓN:Eventos
const botonesCompras = document.querySelectorAll(".card button");
botonesCompras.forEach((boton) => { 
    boton.addEventListener("click", () => {
        alert("¡Producto al carrito!");
        
    });
});
