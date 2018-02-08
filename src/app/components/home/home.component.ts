import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as Pikaday from "pikaday";
import * as moment from "moment";

declare let $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private titulo_fecha:string = "Seleccione un rango";
  private fecha_ida:string;
  private fecha_vuelta:string;
  private minDate:any;
  private maxDate:any;

  constructor( private el : ElementRef ) {
    let currentYear:any = new Date().getFullYear();
    let maxYear:any = currentYear + 2;
    this.minDate = new Date();
    this.maxDate = new Date(maxYear, 11, 31);
  }

  @ViewChild('pruebaFondo') pruebaFondo: ElementRef;

  ngOnInit() {

    let self:any = this;
    let contador:number = 0;
    let fecha_setear:any;
    let calendario = new Pikaday({
      field: document.getElementById('datepicker'),
      firstDay: 1,
      minDate: self.minDate,
      maxDate: self.maxDate,
      yearRange: [2000,2020],
      onSelect: function(){
        contador++;
        fecha_setear = self.ponerDatos(calendario.toString(), contador);
        this.minDate = fecha_setear;
      }
    });

    let altoCarousel:any = Math.abs( $("#fondoPagina").css("height").replace("px", "") );
    $("#fondoPagina").css("height", (altoCarousel + 20));

    //console.log("Prueba del ElementRef: " + this.pruebaFondo.nativeElement.style);
    //$("#fondoPagina").css("height"));

  }

  ponerDatos( fecha:string, posicion:number ) {

    let aux:string;
    let fecha_to_show= moment(fecha).locale("Es").format("dddd, D MMM");

    let fec: any[] = fecha.split("-");
    let anio:number = parseInt( fec[0] );
    let mes:number = parseInt( fec[1] );
    let dia:number = parseInt( fec[2] );

    //Comprobamos que sea la fecha de ida
    if (!(posicion % 2 == 0)){
      this.fecha_ida = null;
      this.fecha_ida = fecha;
      aux = this.capitalizar(fecha_to_show);
      this.titulo_fecha = aux;
      return new Date(anio, mes, dia);

    }else{
      this.fecha_vuelta = null;
      this.fecha_vuelta = fecha;
      aux = this.capitalizar(fecha_to_show);

      if( moment(this.fecha_ida) < moment(this.fecha_vuelta) ){
          this.titulo_fecha = this.titulo_fecha + " - " + aux ;

      }else{
        this.titulo_fecha = aux + " - " + this.titulo_fecha;
      }

      return new Date();

    }

  }

  capitalizar( cadena:string ){
    let result:string = "";

    cadena = cadena.replace(".", "");
    let fechas:any[] = cadena.split(" ");
    console.log(cadena);
    for ( let fecha of fechas){
      if( ! parseInt(fecha) ){
        fecha = fecha.replace(fecha[0],fecha[0].toUpperCase());

      }
      result = result + " " + fecha;
    }

    return result;

  }


}
