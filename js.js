const productosHTML = document.getElementById("contenedor-productos");
const carritoHTML = document.getElementById("carrito");
const botonVaciar = document.getElementById("vaciar");

const contenedorCarrito = document.getElementById("carrito-contenedor")

const precioTotal = document.getElementById("precioTotal")

const carrito = [];

document.addEventListener("DOMContentLoaded", () =>{
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener("click", () => {
    carrito.length = 0
    actualizarCarrito()
})

class Producto {
  constructor(id, nombre, descripcion, cantidad, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.precio = precio;
    this.img = img;
  }
}

const producto1 = new Producto(
  1,
  "Mascarilla exfoliante para pies",
  "Mascarilla apropiada para tus pies, siempre estarán hermosos",
  10,
  45000,
  "./img/Mascarilla exfoliante para piesc.jpg"
);
const producto2 = new Producto(
  2,
  "Lampara ultravioleta",
  "Adios a las noches y dias intranquilos por cuenta de los mosquitos",
  10,
  55000,
  "./img/Lampara ultravioletac.jpg"
);
const producto3 = new Producto(
  3,
  "Eagle Brand",
  "Los malestares respiratorios se acabaran tendran alivio total",
  10,
  75000,
  "./img/Eagle Brandc.jpg"
);
const producto4 = new Producto(
  4,
  "Warm Palace",
  "Mujwe! despide a tus colicos, tendran tranquilidad los 30 dias",
  10,
  25000,
  "./img/Warm Palacec.jpg"
);
const producto5 = new Producto(
  5,
  "Diadema Bluetooth",
  "Despreocupate por llevar audifonos pensando siempre que se caeran",
  10,
  65000,
  "./img/Diademac.jpg"
);
const producto6 = new Producto(
  6,
  "Mascarilla para ojos",
  "Ahora puedes llevar mil horas de trabajo y tus ojos con solo 20 minutos estarn como nuevo",
  10,
  35000,
  "./img/Mascarilla para ojosc.jpg"
);

//agregar los objetos a un arreglo

const productos = [producto1, producto2, producto3, producto4, producto5, producto6];

//crear una fila por cada producto y agregarla al cuerpo de las casillas

const contenedorProductos = document.getElementById("contenedor-productos");

productos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
    <img src="${producto.img}" alt="">  
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p>Talle: ${producto.cantidad}</p>
    <p class="precioProducto">Precio: $${producto.precio.toFixed(1)}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button> 
  `;
  contenedorProductos.appendChild(div);
  const boton = document.getElementById(`agregar${producto.id}`);
  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
});

const agregarAlCarrito = (productoId) => {
    const existe = carrito.some ((producto) => producto.id ===productoId)
  
  if (existe){
    const producto = carrito.map (producto =>{
        if (producto.id === productoId){
            producto.cantidad++
        }
    })
  } else {  
    const item = productos.find((producto) => producto.id === productoId);
  carrito.push(item)
  console.log(carrito)
}
  actualizarCarrito()
 
}

const eliminarDelCarrito = (productoId) => {
    const item = carrito.find((producto) => producto.id === productoId)
    const indice =carrito.indexOf(item)
    carrito.splice(indice,1) 
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((producto) => {
      const div = document.createElement("div");
      div.className = "productoEnCarrito";
      div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: ${producto.precio}</p>
        <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
      `;
      contenedorCarrito.appendChild(div);

      localStorage.setItem("carrito", JSON.stringify(carrito))

    });
  };
  contenedorCarrito.innerText = carrito.length
  precioTotal.innerText = carrito.reduce((acc,producto) => acc + producto.precio, 0)