import {date} from "../variables.js"
export class Horario{
    constructor(shortcutDay, startTime, finishTime){
        this.shortcutDay = shortcutDay;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.pagoHora = 0;
    }

    getTimeStart(){
        let timeSecond = new Date(`${date} ${this.startTime}`).getTime();
        return timeSecond;
    }
    
    getTimeFinish(){
        let timeSecond = new Date(`${date} ${this.finishTime}`).getTime();
        return timeSecond;
    }
    setPago(pago){
        this.pagoHora = pago;
    }
    getPago(){
        return this.pagoHora;
    }
    isWeekend(){
        if(this.shortcutDay === "SU" || this.shortcutDay === "SA"){
            return true;
        }
        return false;
    }
}