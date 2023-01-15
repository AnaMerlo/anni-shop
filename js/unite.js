const nombre = document.getElementById('nombreApellido')
const form = document.getElementById('miForm');
const p=document.getElementById('mensaje')
const tel= document.getElementById('telefono')
const correo= document.getElementById('correoElectronico');
const dom= document.getElementById('domicilio');
const localidad=document.getElementById('localidad');

//registro



//valido el ingreso del nombre que tenga espacio y sea alfabetico

function validarForm(){
    if(!/^[a-zA-Z\s]+$/.test(nombre.value) || (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(correo.value))){
    //usar el dom para el msj
    p.innerText = 'El nombre o el email son válidos';
    }
    else{
    const nuevoCandidato = new Candidato(nombre.value, tel.value, correo.value, dom.value, localidad.value);
    guardarCandidato(nuevoCandidato);
    guardarEnLS(candidatos);
    p.innerText = 'Se envio correctamente';
    }
}

//si hay datos en LS sino []
let candidatos;
if(localStorage.getItem('candidatos')){
    candidatos = JSON.parse(localStorage.getItem('candidatos'));
}
else{
    candidatos = [];
}

//constructor

class Candidato{
    constructor(nombre, telefono, email){
    this.nombre = nombre;
    this.telefono = parseInt(telefono);
    this.email = email;
    this.domicilio = domicilio;
    this.localidad = localidad;
    }
}

//guardar candidatos

function guardarCandidato(candidato){
    return candidatos.push(candidato);
}

//guarde en LS

function guardarEnLS(arr){
    return localStorage.setItem('candidatos', JSON.stringify(arr))
}

//evento

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    validarForm();
    form.reset();
    
  //localStorage.clear()
});



