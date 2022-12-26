
                                                                                                   // TIENDA Amélie Pastelería



let precio;
let envio;
let menuPrincipal;
let usuario;
let cantidad;
let pasoMenu = false;
let pasoCantidad = false;
let pasoEnvio = false;

function resultado(precio, cantidad){
  return precio * cantidad;
}


//funcion constructora de mi catalogo de productos

function Producto(id, nombre, precio, stock){
  this.id = id;
  this.nombre = nombre.toUpperCase();
  this.precio = parseFloat(precio);
  this.stock = parseInt(stock);
  this.disponible = (cantidad)=>{
    if(cantidad <= this.stock){
      this.stock= this.stock - cantidad
      carrito.push({menuPrincipal, precio, cantidad})
    }
    else if(cantidad > this.stock){
      alert("sin stock")
    } 
  }
}

const desayuno = new Producto(1,"Desayuno minicakes", 1800, 10 );
const torta = new Producto(2,"torta", 3800,  20 );
const tartaArandanos = new Producto(3,"tarta de arandanos", 2800, 5 );
const tarta = new Producto(4, "tarta de lemon pie", 3000,12);
const tortaPionono = new Producto(6, "torta de pionono con frutas", 3500, 5);
const crumble = new Producto(7, "crumble de manzana", 3000,10);



const catalogoProductos = [];

catalogoProductos.push(desayuno)
catalogoProductos.push(torta)
catalogoProductos.push(tartaArandanos)
catalogoProductos.push(tarta)
catalogoProductos.push(tortaPionono)
catalogoProductos.push(crumble) 

//console.log(catalogoProductos)

function repetir(){
  while( usuario != "no"){
    usuario = prompt("desea seguir comprando?")
  if(usuario === "si"){
    menu()
  }
  else if(usuario === "no"){
    alert("gracias por su visita")
    carrito.forEach((el)=>{
      console.log(`producto: ${el.menuPrincipal}, unidades: ${el.cantidad}, el total es por producto es:  ${el.precio * el.cantidad} `)
    })
    break
  }
}
}



const carrito = [];



function pasomenu(){
  pasoMenu = false;
  while(pasoMenu === false){
    menuPrincipal = prompt("Tienda online Amélie pasteleria, \nQue desea llevar : \n-Desayuno minicakes : $1800 \n-Tarta de lemon pie : $2800 \n-Torta tiramisú : $3800 \n-Tarta de arandanos : $2800 \n-Torta de pionono : $3500 \n-Crumble de manzana : $3000.\nPara salir ponga fin")
    if((menuPrincipal === "Desayuno minicakes") || (menuPrincipal === "Torta de pionono") || (menuPrincipal === "Tarta de arandanos") || (menuPrincipal === "Tarta de lemon pie") || (menuPrincipal === "Torta de tiramisu") || (menuPrincipal === "Crumble de manzana")){
      pasoMenu = true
      carritoCompras()
      break
    }
    else if(menuPrincipal === "fin"){
      pasoMenu = true
        break
    } 
    else{
        alert("¡Ingrese una de las opciones!")
    }
  }
}

function pasocantidad(){
  pasoCantidad = false;
  precio = 0
  while(pasoCantidad === false) {
    cantidad = parseInt(prompt("¿Cuantos desea llevar?"))
    if(isNaN(cantidad) || cantidad<0) {
      alert("Ingrese una cantidad válida") 
    }
    else {
    if(menuPrincipal === "Desayuno minicakes" ) {
      pasoCantidad = true
      precio= desayuno.precio;
      comida = desayuno
      }
      else if(menuPrincipal === "Torta de pionono") {
        pasoCantidad = true
        precio= torta.precio;
        comida = torta
      }
        else if(menuPrincipal === "Tarta de lemon pie"){
        pasoCantidad = true
        precio= tarta.precio;
        comida = tarta
      }
      comida.disponible(cantidad)
      repetir()
    }
  }
}


// funciones principales

function menu(){
  pasomenu()
}

function carritoCompras(){
  pasocantidad()
}

menu()


console.log(carrito);
const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

console.log("el total a pagar es " + (total * 1.21))







//                         buscador
function buscadorCategorias(arr, filtro){
  const encontrado = arr.filter((el)=>{
    return el.nombre.includes(filtro.toUpperCase());
  }) 
    return encontrado;
}

let persona = prompt("¿Que desea buscar?")
const productoEncontrado = buscadorCategorias(catalogoProductos, persona)
console.log(productoEncontrado)



//                         buscar por precio
function buscarxPrecio(arr, persona2){
const rangoDPrecio = arr.filter((el)=>{
  return  el.precio < persona2
}) 
  return rangoDPrecio;
}

let persona2 = parseInt(prompt("indique precio esperado a encontrar"))
const listaEncontrada= buscarxPrecio(catalogoProductos, persona2)

console.log(listaEncontrada)