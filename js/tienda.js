
const contador=document.getElementById('contador');
const contenedor = document.getElementById('catalogo');
const carritoNodo = document.getElementById('carrito');
const precioTotal = document.getElementById('total')
const p = document.getElementById('texto')



//si hay datos en LS sino [] Sugar sintaxis
let carrito;
if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'));
}
else{
    carrito = [];
}

/*let carrito = JSON.parse(localStorage.getItem('carrito')) || [];*/ 

//funcion constructora de mi catalogo de productos

function Producto(id, nombre, precio, cantidad){
    this.id = id;
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
}

    const vestidoB = new Producto(1,"Vestido Bordo", 4500, 1);
    const vestidoL = new Producto(2,"Vestido con lunares", 8000, 1);
    const vestido = new Producto(3,"Vestido", 7000, 1);
    const blusa = new Producto(4, "Blusa", 3000, 1);
    const blusaR = new Producto(5, "Blusa Rosa", 3500, 1);



const catalogoProductos = [];

catalogoProductos.push(vestidoB)
catalogoProductos.push(vestidoL)
catalogoProductos.push(vestido)
catalogoProductos.push(blusaR)
catalogoProductos.push(blusa)



//añadir al carrito

function agregarALcarrito(producto){
    const existe = carrito.some((el)=> el.id === producto);
    console.log(existe)
    if(existe){
        const el = carrito.map((el)=>{
            if(el.id === producto){
                el.cantidad++
            } 
        })
    }
    else {
        const seAgrega = catalogoProductos.find((el)=> el.id === producto);
        carrito.push(seAgrega);
        console.log(carrito)
        
    }
    guardarEnLS(carrito)
    mostrarCarrito(carrito)
    console.log(carrito)
}

//guardar el carrito en LS

function guardarEnLS(arr){
    return localStorage.setItem('carrito', JSON.stringify(arr))
}


//mostrar catalogo de productos


function crearHTML(array){
    let html;
    contenedor.innerHTML = "";
    for (const producto of array) {
        html =
        `<div class="section__div  col-md-3">
        <img src="./assets/img/${producto.nombre}.jpeg" class="section__img--300">
        <h4 class="section__h4"><p class="section__titulo">${producto.nombre}</p></h4>
        <div class="section__flex">
            <p class = "card-text">${producto.precio}</p>
            <button id="btn-catalogo-${producto.id}" class="boton">Agregar al carrito</button>
        </div>
        </div>`
        contenedor.innerHTML += html;
    }
    botonesCatalogo(array)
}



//mostrar productos del carrito

function mostrarCarrito(array){
    let html;
    carritoNodo.innerHTML = "";
    for (const producto of array) {
        html =
        `<tr>
        <td><img src="../assets/img/${producto.nombre}.jpeg" class="section__img--50"></td>
        <td><h4 ><p class="section__titulo">${producto.nombre}</p></h4></td>
        <td><p class="section__h3">${producto.precio}</p></td>
        <td><p  class="section__h3">Cantidad: <span id="cantidad">${producto.cantidad}</span></p></td>
        <td><p></p></td>
        <td><button id="btn-carrito-${producto.id}" class="btn btn-danger section__h3">Borrar</button></td>
        </tr>`
        carritoNodo.innerHTML += html;
    }
    borrarCarrito(array)
    contador.innerText = carrito.length
    precioTotal.innerHTML = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    
}

//btncatalogo

function botonesCatalogo(array){
    for (const producto of array) {
        const botonId = `btn-catalogo-${producto.id}`;
        const botonNodo = document.getElementById(botonId);
        botonNodo.addEventListener("click", () => {
        agregarALcarrito(producto.id)
        });
    }
}



function borrarCarrito(array){
    for (const producto of array) {
        const borrar = document.getElementById(`btn-carrito-${producto.id}`);
        borrar.addEventListener('click', () => {
            const posicion = carrito.findIndex((p) => p.id == producto.id);
            carrito.splice(posicion, 1);
            console.log(posicion)
            guardarEnLS(carrito)
            mostrarCarrito(carrito)
        })
    }
}

//llamara la funcion crear

crearHTML(catalogoProductos)


//filtros de busqueda

function buscadorCategorias(arr, filtro){
    const encontrado = arr.filter((el)=>{
        return el.nombre.includes(filtro);
    }) 
        return encontrado;
}
search.addEventListener('input', ()=>{
    let newFiltro = buscadorCategorias(catalogoProductos, search.value);
    crearHTML(newFiltro);
});

//finalizar compra

const fin = document.getElementById('finalizar');
fin.addEventListener('click', ()=>{
    window.location.href = "./pages/finalizar_compra.html";
})





