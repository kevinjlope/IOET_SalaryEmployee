import {mapaHorariosPago, url, empleados,btnConsultar, contenedorEmpleado, totalUI} from "./variables.js"
import {Empleado} from "./clases/Empleado.js"
import {Horario} from "./clases/Horario.js"
//import {UI} from "./clases/UI.js"

export function cargarMapaWork(){
    mapaHorariosPago.set("00:01:00-09:00:00", 25)
    mapaHorariosPago.set("09:01:00-18:00:00", 15)
    mapaHorariosPago.set("18:01:00-23:59:59", 20)
}
export async function leerArchivo(){
    let respuesta = await fetch(url)
    let texto = await respuesta.text();
    //console.log(texto)
    separarArchivo(texto);
    //console.log(empleados)
    return empleados;
}

function separarArchivo(string){
    console.log(`***********Salida por consola********** \n***********Salarios por empleado******** \n` )
    let arrayLinea = string.split("\n")
    //console.log(arrayLinea)
    arrayLinea.forEach(linea => {
        const arrayNombreHorario = linea.split("=");
        //console.log(arrayNombreHorario[0])
        const nombre = arrayNombreHorario[0]
        const horarioswork = arrayNombreHorario[1];
        const empleado = new Empleado(nombre, horarioswork, 0);
        empleados.push(empleado)
        separarHorariosWork(horarioswork, empleado);
    })
    //console.log(empleados)
    
    
}

function separarHorariosWork(horarios,empleado){
    let arrayHorarioWork = horarios.split(",")
    //console.log(arrayHorarioWork)
    let saldoEmpleado = 0;
    arrayHorarioWork.forEach(horario => {
        const shorcutDay = horario.slice(0,2);
        const arrayTimeWork = horario.slice(2).split("-")
        //console.log(arrayTimeWork)
        const forHorarioEmpleado = new Horario(shorcutDay, `${arrayTimeWork[0]}:00`, `${arrayTimeWork[1]}:00`);
        //console.log(forHorarioEmpleado.getTimeFinish())
        empleado.setArrayHourWork(forHorarioEmpleado);
        pagoHoraHorario(forHorarioEmpleado);
        saldoEmpleado += forHorarioEmpleado.getPago();
    })
    empleado.setSaldo(saldoEmpleado)
    console.log(empleado.mostrarInfo())
}

function pagoHoraHorario(horario){
    let pagaHorario = 0;
    mapaHorariosPago.forEach((pago, rangoHorario) => {
        const arrayRangoHorario = rangoHorario.split("-")
        let objRangoHorario = new Horario("", arrayRangoHorario[0], arrayRangoHorario[1]);
        let x = objRangoHorario.getTimeStart();
        let y = objRangoHorario.getTimeFinish();
        let a = horario.getTimeStart();
        let b = horario.getTimeFinish();
        //console.log(x,y,a,b)
        if(isRango(x,y,a,b)){
            //d1 = Math.abs(x-y);
            let d1 = Math.abs(a-b)/3600000;
            if(horario.isWeekend()){
                pagaHorario = (pago+5)*d1;
            }else{
                pagaHorario = pago*d1;
            }
        }
    })
    horario.setPago(pagaHorario);
}

function isRango(x,y,a,b){
    if (Math.min(x, y) <= Math.max(a, b) && Math.max(x, y) >= Math.min(a, b)) {
        return true;
    }else{
        return false;
    }
}
export function manipularDOM(){
    btnConsultar.addEventListener("click", mostrarBotones)
}

function mostrarBotones(e){
    //e.preventDefault();
    limpiarHTML();
    let totalSaldoAll = 0;
    //console.log("Hola Mundo")
    empleados.forEach(empleado => {
        //console.log(empleado)
        let article = document.createElement("article");
        article.innerHTML = `
            <h2> Nombre: ${empleado.nombre} </h2>
            <p class = "parrafo">Horario: ${empleado.horario}</p>
            <h2> Saldo: $${empleado.saldo} </h2>
        `
        article.className = "articleEmpleado"
        contenedorEmpleado.appendChild(article);
        totalSaldoAll += empleado.saldo;
    })
    totalUI.textContent = `Total a pagar en esta semana: $ ${totalSaldoAll}`;

}
function limpiarHTML() {
    while(contenedorEmpleado.firstChild) {
        contenedorEmpleado.removeChild(contenedorEmpleado.firstChild);
    }
}