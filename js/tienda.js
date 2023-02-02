//VARIABLES
const contador=document.getElementById('contador');
const contenedor = document.getElementById('catalogo');
const carritoNodo = document.getElementById('carrito');
const precioTotal = document.getElementById('total');
const p = document.getElementById('texto');
const lista=document.querySelectorAll('li');
const vaciar = document.getElementById('vaciar');
const algo=document.querySelectorAll('.header__a--16');
const carritoVacio = document.getElementById('carritoV');
const fin = document.getElementById('finalizar');


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// OBTENER MIS PRODUCTOS DESDE DATA.JSON
fetch('./data/data.json')
.then((response) => response.json())
.then((catalogoProductos) => {
    function crearHTML(catalogoProductos){
        contenedor.innerHTML = "";
        catalogoProductos.forEach((producto) => {
            const {nombre,img, precio, id} = producto
            const div = document.createElement('div')
            div.className = 'section__div col-md-3'
            div.innerHTML = `
            <img src="./assets/img/${img}" class="section__img--300">
            <p class="section__titulo">${nombre}</p>
            <p>${precio}</p>
            <button id="btn-catalogo-${id}" class="boton">Agregar al carrito</button>`
            contenedor.append(div);

            const botonNodo = document.getElementById(`btn-catalogo-${id}`);
            botonNodo.addEventListener("click", () => {
                    agregarALcarrito(id)
            })
            //funcion agregar productos al carrito
            function agregarALcarrito(producto){
                const existe = carrito.some(el => el.id === producto);
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
                    if(carrito.length >= 1){
                        carritoVacio.innerHTML = " "
                    }
                }
                guardarEnLS(carrito)
                mostrarCarrito(carrito)
                
                Toastify({
                    text: `Agregaste ${nombre} al carrito` ,
                    duration: 1500,
                    // destination: "https://github.com/apvarun/toastify-js",
                    // newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #000, #000)",
                    },
                    onClick: function(){} // Callback after click
                }).showToast();
            }
        }) 
    }
    mostrarCarrito(carrito)
    
    //MUESTRO EL FILTRO POR EL DOM
    search.addEventListener('input', ()=>{
        let newFiltro = buscadorCategorias(catalogoProductos, search.value);
        crearHTML(newFiltro)
    });
    //MUESTRO EL FILTRO POR CATEGORIA EN EL DOM
    lista.forEach((el)=>{
        el.addEventListener('click', (event)=>{
            const idCategoria = event.target.id;
            const productoFiltrado = catalogoProductos.filter((el)=>el.categoria === idCategoria);
            crearHTML(productoFiltrado);
            activo(idCategoria)
        })
    })
    crearHTML(catalogoProductos)
}) 



//guardar el carrito en LS

function guardarEnLS(arr){
    return localStorage.setItem('carrito', JSON.stringify(arr))
}

//mostrar productos del carrito

function mostrarCarrito(array){
    carritoNodo.innerHTML = "";
    array.forEach((producto) =>{
        const {img, nombre, cantidad, precio, id} = producto
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td><img src="./assets/img/${img}" class="section__img--50"></td>
        <td><p class="section__titulo">${nombre}</p></td>
        <td><p class="section__h3">${precio}</p></td>
        <td><p  class="section__h3"><span id="cantidad">${cantidad}</span></p></td>
        <td><svg id="btn-carrito-${id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg></td>
        `
        carritoNodo.append(tr);
    }) 
    borrarCarrito(array)
    contador.innerText = carrito.length
    precioTotal.innerHTML = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

}


//FUNCION BORRAR LOS PRODUCTOS DEL CARRITO
function borrarCarrito(array){
    for (const producto of array) {
        const borrar = document.getElementById(`btn-carrito-${producto.id}`);
        borrar.addEventListener('click', () => {
            const posicion = carrito.findIndex((p) => p.id == producto.id);
            carrito.splice(posicion, 1);
            if (carrito.length < 1){
                carritoVacio.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-cart-x altura" viewBox="0 0 16 16">
                <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>`
            }
            guardarEnLS(carrito)
            mostrarCarrito(carrito)
            
        })
    }
}


//boton vaciar carrito

vaciar.addEventListener('click', ()=>{
    carrito = [];
    mostrarCarrito(carrito)
    guardarEnLS(carrito)
})



//funcion filtra

function buscadorCategorias(arr, filtro){
    const encontrado = arr.filter((el)=>{
        return el.categoria.includes(filtro);
    }) 
        return encontrado;
}


//finalizar compra

fin.addEventListener('click', ()=>{
    if(carrito.length >= 1){
        window.location.href = "./pages/finalizar_compra.html";
        carrito = [];
        mostrarCarrito(carrito)
        guardarEnLS(carrito)
    }else {
        carritoVacio.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-cart-x altura" viewBox="0 0 16 16">
        <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z"/>
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>`
    }
})



//marca con la class active la categoria seleccionada
function activo(produc){
    const algo=document.querySelectorAll('.header__a--16');
        if(produc == "blusa"){
            algo[0].classList.add('active');
        } else {
            algo[0].classList.remove('active')
        }
        if(produc == "vestido"){
            algo[1].classList.add('active')
        } else {
            algo[1].classList.remove('active')
        }
        if(produc == "remera"){
            algo[2].classList.add('active')
        } else {
            algo[2].classList.remove('active')
        }
        if(produc == "pantalon"){
            algo[3].classList.add('active')
        } else {
            algo[3].classList.remove('active')
        }
}

