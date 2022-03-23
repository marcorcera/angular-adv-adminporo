import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo!:string;
  public tituloSubs$!:Subscription;

  constructor( private router:Router) {

    this.tituloSubs$ = this.getDataRuta()
                        .subscribe( ({title}) =>{ //utilizamos la desestructuración de data para sacar el titulo
                          this.titulo = title;
                          document.title = this.titulo;
                        })
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getDataRuta()
  {
    return this.router.events
      .pipe(
        filter( (event:any) => event instanceof ActivationEnd),
        filter( (event:ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event:ActivationEnd) => event.snapshot.data ),
      )  
  }

}
