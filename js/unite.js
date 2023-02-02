//VARIABLES
const nombre = document.getElementById('nombreApellido')
const form = document.getElementById('miForm');
const p=document.getElementById('mensaje')
const tel= document.getElementById('telefono')
const correo= document.getElementById('correoElectronico');



let candidatos = JSON.parse(localStorage.getItem('candidatos')) || [];


//VALIDACION DE NOMBRE Y CORREO

function validarForm(){
    if(!/^[a-zA-Z\s]+$/.test(nombre.value) || (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(correo.value))){
    //usar el dom para el msj
    p.innerText = 'El nombre o el email son válidos';
    }
    else{
    const nuevoCandidato = new Candidato(nombre.value, tel.value, correo.value);
    guardarCandidato(nuevoCandidato);
    guardarEnLS(candidatos);
    p.innerText = 'Se envio correctamente';
    }
}



//constructor

class Candidato{
    constructor(nombre, telefono, email){
    this.nombre = nombre;
    this.telefono = parseInt(telefono);
    this.email = email;
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
