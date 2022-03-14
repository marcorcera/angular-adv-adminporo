import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent{

  //para recibir un valor des del padre utilizamos @Input() delante la variable
  //podemos cambiarle el nombre de la variable a utilizar en el padre "value"
  @Input('value') progress:number = 50;

  @Output() valorSalida:EventEmitter<number> = new EventEmitter();  

  // get getPorcentage(){
  //   return `${this.progress}%`;
  // }

  cambiarValor(valor:number){

    if(this.progress >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      this.progress = 100;
      return;
    }

    if(this.progress <= 0 && valor < 0){
      this.valorSalida.emit(0);
      this.progress = 0;
      return;
    }

    this.progress = this.progress + valor;
    this.valorSalida.emit(this.progress);
  }

}
