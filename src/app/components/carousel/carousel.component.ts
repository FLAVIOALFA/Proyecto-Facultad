import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  private card:number = 0;
  private cards_cuenta:number = 0;
  private screenWidth:any;
  private tamanoVentana:number = 0;
  private inicio:number = 1;
  private hasta:number = 1;
  private clicks:number = 0;
  private max_clicks:number = 0;
  private li_total:any;
  private tamano_ultima_card:number = 0;
  private tamano_carousel:number = 0;
  private bool:boolean = true;
  private inter:any;
  private slideActive:boolean = true;

  constructor(  ) {
    //this.screenHeight = window.screen.height;
    this.screenWidth = window.screen.width;
  }

  ngOnInit() {
    //Aca se hace algo cuando el componente arranca.
    console.log("Siguiente: " + this.inicio);
    console.log("Prev: " + this.inicio);

    //=========== Contamos la cantidad de cards ============
    let carousel_ul = document.querySelector("#idUl");
    this.li_total = carousel_ul.getElementsByTagName('li');

    this.cards_cuenta = this.li_total.length;
    console.log("Cards Cuenta: " + this.li_total.length);
    //======================================================

  }

  onResize(event){
    clearInterval(this.inter);
    this.tamanoVentana = event.target.innerWidth;

    //======================== CALCULAR EL CAROUSEL ========================
    //Este es el tamaño del div que contiene las cards
    this.tamano_carousel = document.getElementById("carousel").offsetWidth;

    //console.log( this.tamano_carousel );

    let contador:number = 0;
    let aux:number = this.tamano_carousel;

    //Contamos la cantidad de cards enteras que caben.
    while( aux > 330 ){
      aux -= 330;
      contador ++;
    }

    //Esta es la cantidad de cards completas que entran en el carousel
    this.inicio = contador;
    this.hasta = contador;

    //Esta es la cantidad de clicks que se van a poder hacer.
    this.max_clicks = this.cards_cuenta - this.hasta;

    //Aca determinamos cuantos pixeles vamos a mover en el ultimo click.
    let tamano_mostrado:number =  this.tamano_carousel - (330 * contador);
    let tam:number = this.tamano_carousel - 32;
    document.getElementById("btnSiguiente").style.setProperty("left", tam+"px");

    this.tamano_ultima_card = 320 - tamano_mostrado;

    this.IntervaloSlide();
    //====================== FIN CALCULAR EL CAROUSEL ======================

  }

  IntervaloSlide(){

      this.inter = setInterval(() =>{
        if( this.bool ){
          this.sig();

        } else {
          this.card = 0 - this.tamano_ultima_card;
          this.prev();
          this.clicks = 0;
        }

      }, 7000); // 7 segundos
  }

  slide(){
    let st = {
      "margin-left" : this.card + "px",
      "transition" : "1.2s"
    };
    return st;
  }

  sig(){

    if( this.max_clicks > this.clicks ){
      //Acá comprobar que sea el ultimo que pueda hacer
      if( ( this.max_clicks - this.clicks ) == 1 ){

        this.card = this.card - this.tamano_ultima_card;
        this.bool = false;

      }else{
        this.card = this.card - 330;
      }
      this.clicks = this.clicks + 1;
    }

  }

  prev(){
    this.bool = true;
    if( this.max_clicks >= this.clicks && this.clicks > 0){
      //Acá comprobar que sea el ultimo click para hacer
      if( this.clicks == this.max_clicks ){
        this.card = this.card + this.tamano_ultima_card;

      }else{
        this.card = this.card + 330;
      }
      this.clicks = this.clicks - 1;
    }

  }

  prevCard(){
    if( this.slideActive ){
      clearInterval(this.inter);
      this.slideActive = false;
    }
    this.prev();
  }

  sigCard(){
    if( this.slideActive ){
      clearInterval(this.inter);
      this.slideActive = false;
    }
    this.sig();
  }

}
