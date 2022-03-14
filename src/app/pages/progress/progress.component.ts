import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent{

  //para inicializar las barras de progreso
  progreso1: number = 25;
  progreso2: number = 35;

  get getProgreso1(){
    return `${this.progreso1}%`;
  }

  get getProgreso2(){
    return `${this.progreso2}%`;
  }

  //que hacer cuando se reciba el evento (valorSalida) que viene del componente hijo
  //de esta manera tendermos que hacer una funciona por cada componente hijo.
  cambioValorHijo(valor:number){
    this.progreso1 = valor;
  }

  cambioValorHijo2(valor:number){
    this.progreso2 = valor;
  }
}
