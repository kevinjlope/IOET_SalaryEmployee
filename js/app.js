import {cargarMapaWork, leerArchivo, manipularDOM} from "./funciones.js"
//import {mapaHorariosPago} from "./variables.js"
import {empleados} from "./variables.js"
let Empleados = []

//iniciarApp();
document.addEventListener('DOMContentLoaded', iniciarApp);
async function iniciarApp(){
    cargarMapaWork();
    await leerArchivo().then((empleados) => {
        Empleados = [...empleados]
        //console.log(Empleados)
    })
    //console.log(Empleados)
    manipularDOM();
}

