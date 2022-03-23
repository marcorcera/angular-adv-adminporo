import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs!:Subscription;

  constructor() { 

    //EJEMPLO 1

    // let i = -1;

    // const obs$ =  new Observable<number>( observer => {

    //   const intervalo = setInterval( () => {
    //     i++;
    //     observer.next(i);
        
    //     if( i === 4){
    //       clearInterval(intervalo);
    //       observer.complete();
    //     }

    //     if( i === 2){
    //       observer.error('i llegó al valor de 2');
    //     }

    //   }, 1000)

    // } );


    // obs$.subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.log('Error:', error),
    //   () => console.info('Obs terminado')
    // );

    //aplicar el retry
    // obs$.pipe(
    //   retry() //retry(1) o 2,3,4 etc
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.log('Error:', error),
    //   () => console.info('Obs terminado')
    // );
    
    //EJEMPLO 2
    // this.retornaObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.log('Error:', error),
    //   () => console.info('Obs terminado')
    // );
    
    //EJEMPLO 3
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
      
      //también podemos mandar el argumento que retorna el subscribe directamente a otra funcion de esta manera:
      //.subscribe( console.log );
      //.subscribe(
      //   (valor) => console.log(valor)
      // );
      
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  //EJEMPLO 3
  retornaIntervalo():Observable<number>
  {
    //si queremos parar el interval para que no sea infinito utilizamos el take
    //el take le dice al observable cuantas emisiones del obs necesita
    //el map sirve para transformar o limpiar la informacion que recibe el observable y mutarla como queramos
    //por ejemplo la info de una API
    //el filter solo deja pasar el valor true del condicional

    //podemos hacer el retunr directamente:
    //return = interval()...
    const intervalo$ = interval(1000)
                        .pipe(
                            map( valor => {
                              return valor +1;
                            }),
                            filter( valor => (valor % 2 === 0) ? true : false ),
                            take(10),
                            
                            //podemos hacer el return de map así
                            //map( valor => 'Hola mundo: ' + (valor +1))
                        );

    return intervalo$;
  }

  retornaObservable():Observable<number>
  {
    let i = -1;

    //también return = new Observable...
    const obs$ =  new Observable<number>( observer => {

      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        
        if( i === 4 ){
          clearInterval(intervalo);
          observer.complete();
        }

        if( i === 2){
          observer.error('i llegó al valor de 2');
        }

      }, 1000)

    } );
    
    return obs$;
  }

  ngOnInit(): void {
  }

}
