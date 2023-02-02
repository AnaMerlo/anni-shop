
//VARIABLES
const correo= document.getElementById('correoElectronico');
const form = document.getElementById('miForm');
const p=document.getElementById('mensaje');
const detalleCompra = document.getElementById('detalle__compra')
const continuar = document.querySelector('.continuar')

let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

//validar el correo, pinta en el dom una vez hecho este primero


continuar.addEventListener('click', ()=>{
        if(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(correo.value)){
            continuar.remove('.continuar')
            detalleCompra.innerHTML = ` <p class="form__label" >Datos del cliente</p>
            <div class= "marco form">
            <div>
            <div>
                <label for="nombreApellido" ></label>
                <input type="text" name="nombreApellido" id="nombreApellido"  required placeholder="Ingresa tu Nombre y Apellido*">
            </div>
            </div>
            <!-- campo para telefono -->
            <div>
            <div> 
                <label for="telefono" ></label>
                <input type="tel" name="telefono" id="telefono"  placeholder="Ingresa tu Teléfono*">
            </div>
            </div>
            <div>
                <label for="domicilio"></label>
                <input type="text" name="domicilio" id="domicilio"  required placeholder="Domicilio">
            </div>
            <div>
                <label for="localidad"></label>
                <input type="text" name="localidad" id="localidad" required placeholder="Localidad / Ciudad">
            </div>
            <!-- campo para boton enviar -->
            <div class="form__flex ">
            <input type="submit" value="Enviar">
            </div>`
        }
        else{
            
            p.innerText = "correo invalido"
        }
    })


//constructor

class Cliente{
    constructor(nombre, telefono, email, domicilio, localidad){
    this.nombre = nombre;
    this.telefono = parseInt(telefono);
    this.email = email;
    this.domicilio = domicilio;
    this.localidad = localidad;
    }
}

//GUARDAR CLIENTES

function guardarCliente(cliente){
    return clientes.push(cliente);
}

//guarde en LS

function guardarEnLS(arr){
    return localStorage.setItem('clientes', JSON.stringify(arr))
}

//evento SUBMIT CAPTURA LOS VALUE UNA VEZ HECHO EL EVENTO

form.addEventListener('submit',(event) => {
    event.preventDefault();
    const nombre = document.getElementById(`nombreApellido`).value;
    const domicilio = document.getElementById('domicilio').value;
    const localidad = document.getElementById('localidad').value;
    const telefono = document.getElementById('telefono').value;
    const nuevoCliente = new Cliente(nombre, telefono, correo.value, domicilio, localidad);
    guardarCliente(nuevoCliente);
    guardarEnLS(clientes);
    form.reset()
    //localStorage.clear()
    metodoP()
});


function metodoP(){
    detalleCompra.innerHTML = `<p class="fw-bold">Metodos de pago</p>
    <div class= "marco">
    <label for="mercadoPago" class ="p-4"><img class="wd"src="../assets/img/mercado-credito.png" ></label>
    <input type="radio"  value="mercadoPago"  name="logo" id="mercadoPago" class="w-auto">
    <label for="tarjeta" class ="p-4"><img class="wd"src="../assets/img/tarjeta-credito.png" ></label>
    <input type="radio" value="tarjeta"  name="logo" id="tarjeta" class="w-auto">
    <label for="efectivo" class ="p-4"><img class="wd"src="../assets/img/rapipago.png" ></label>
    <input type="radio" value="efectivo" name="logo" id="efectivo" class="w-auto">
    `
    cambiorRadioButton()
}

function cambiorRadioButton(){
    const radios = document.querySelectorAll('input[type="radio"]')
    for (const radio of radios) {
        radio.addEventListener('click', () =>{
            Swal.fire({
                title: '¿Desea continuar con la compra?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Si',
                denyButtonText: `No`,
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('¡Su compra se realizo con exito!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Se eliminaron los productos del carrito', '', 'warning')
                }
            })
        })
    }
}


