
                                                                                                   // TIENDA Amélie Pastelería

function resultado(precio, cantidad){
  return precio * cantidad;
}
function continuar(){
  let opcion = confirm("¿Desea confirmar su compra?")
  if(opcion == true){
    alert("¡Su pedido esta en camino!")
  } else{
    alert("¡Gracias por visitarnos!")
  }
}


let precio;
let pasoMenu = false;
let pasoCantidad = false;
let pasoEnvio = false;
let cantidad;
let envio;
while(pasoMenu === false){
  let menuPrincipal = parseInt(prompt("Tienda online Amélie pasteleria, \nQue desea llevar : \n1-Desayuno minicakes : $1800 \n2-Tarta de lemon pie : $2800 \n3-Torta tiramisú : $3800. \nPara salir marque 0"))
  if((menuPrincipal === 1) || (menuPrincipal === 2) || (menuPrincipal === 3)){
    pasoMenu = true
      while(pasoCantidad === false) {
        cantidad = parseInt(prompt("¿Cuantos desea llevar?"))
        if(isNaN(cantidad) || cantidad<0) {
          alert("Ingrese una cantidad válida") 
        }
        else {
          if(menuPrincipal === 1) {
            pasoCantidad = true
            precio= 1800
          }
          else if(menuPrincipal === 2) {
            pasoCantidad = true
            precio= 2800;
          }
          else if(menuPrincipal === 3){
            pasoCantidad = true
            precio= 3800;
          } 
          alert("El total de su pedido es :" + " " + resultado(precio, cantidad));
          while(pasoEnvio === false){
            envio = parseInt(prompt("Si desea con envio son $600. Ingrese 1 sino marque 0"))
            if(envio === 1){
              pasoEnvio = true
              alert("Total a pagar es:" + " " + (resultado(precio, cantidad) + 600))
            } else if(envio === 0){
              break
            } else if(isNaN(envio) ){
              alert("Ingrese un dato correcto")
            }
          }
          continuar()
        }
      }
  }
  else if(menuPrincipal === 0){
    break
  } 
  else{
    alert("¡Ingrese una de las opciones!")
  }
}
