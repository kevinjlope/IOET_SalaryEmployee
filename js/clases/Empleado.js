export class Empleado{
    constructor(nombre, horario, saldo){
        this.nombre = nombre;
        this.horario = horario;
        this.saldo = saldo;
        this.arrayHourWork = []
    }
    setArrayHourWork(horarioWork){
        this.arrayHourWork.push(horarioWork)
    }

    getArrayHourWork(){
        return this.arrayHourWork;
    }
    setSaldo(pago){
        this.saldo = pago;
    }
    getSalgo(){
        return this.saldo;
    }
    totalSaldo(){
        let pagoHoraHorario = 0;
        this.arrayHourWork.forEach(horario => {
            pagoHoraHorario += horario.pagoHora;
        })
        this.setSaldo(pagoHoraHorario);
    }
    mostrarInfo(){
        return `${this.nombre} tiene un saldo de: $${this.saldo}`
    }
}