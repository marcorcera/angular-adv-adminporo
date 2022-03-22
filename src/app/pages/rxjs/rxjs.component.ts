import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

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
    this.retornaObservable().pipe(
      retry()
    ).subscribe(
      valor => console.log('Subs:', valor),
      error => console.log('Error:', error),
      () => console.info('Obs terminado')
    );
  }

  retornaIntervalo()
  {
    const interval$:Observable<number> = interval(1000)
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
