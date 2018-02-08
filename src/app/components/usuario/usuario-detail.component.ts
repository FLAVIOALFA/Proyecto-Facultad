import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {FormControl} from "@angular/forms";
import { PaisService } from "../../services/pais/pais.service";
import { ProvinciaService } from "../../services/provincia/provincia.service";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { LoginService } from "../../services/login/login.service";
import { DomicilioService } from "../../services/domicilio/domicilio.service";
import { Router } from "@angular/router";

import { Pais } from "../../models/pais.model";
import { Provincia } from "../../models/provincia.model";
import { Domicilio } from "../../models/domicilio.model";
import { Usuario } from "../../models/usuario.model";

declare let $:any;

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  private identity:any;
  private token:any;
  private haveDomicilio:boolean;
  private idDomi:any;
  private yesChange:boolean;

  private reservas:boolean;
  private cuenta:boolean;
  private personales:boolean;
  private cambiarContrasena:boolean;

  public messageSuccess:string = "";
  public messageError:string = "";

  public loading:boolean = false;
  private dias:string[];
  private meses:string[];
  private anios:string[];

  private domicilio:Domicilio = {
    calle : "",
    barrio : "",
    numero : null,
    latitud : null,
    longitud : null,
    provincia : null
  };


  private pais:Pais = {
    _id : null,
    codContinente : null,
    codPais : null,
    nombre : "",
  };

  private provincia:Provincia = {
    _id : null,
    pais : null,
    nombre : ""
  };

  private paises:Pais[];
  private provincias:Provincia[];

  private user:Usuario = new Usuario();

  public usuario:any = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    sexo: "",
    fecha_nacimiento: ""
  };

  private sexos:string[] = ["Masculino", "Femenino", "Sin definir"];
  private fecha_nacimiento:any = {
    dia : "",
    mes : "",
    anio : ""
  };

  private newPass:any = {
    oldPass : "",
    newPass : "",
    repPass : ""
  };

  constructor( private el: ElementRef, private renderer: Renderer2,
               private _paisService : PaisService,
               private _provinciaService: ProvinciaService,
               private _usuarioService : UsuarioService,
               private _domicilioService : DomicilioService,
               private _loginService : LoginService,
               private _router : Router ) { }

  @ViewChild('radioM') private radioM : ElementRef;
  @ViewChild('radioF') private radioF : ElementRef;

  ngOnInit() {

    this.cuenta = true;
    this.reservas = false;

    this.dias = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"
      ,"16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    this.meses = ["01","02","03","04","05","06","07","08","09","10","11","12"];

    let array = [];

    for(let i = new Date().getFullYear(); i >= 1900; i--){
      array.push(i);
    }

    this.anios = array;

    //En esta parte cargo los datos al modelo user.
    this.token = localStorage.getItem("token");
    this.identity = localStorage.getItem("identity");
    console.log(JSON.parse(this.identity));
    this.user = JSON.parse(this.identity);

    //Seteamos la fecha de nacimiento
    this.fecha_nacimiento = {
      dia : this.user.fecha_nacimiento.split("/")[2],
      mes : this.user.fecha_nacimiento.split("/")[1],
      anio : this.user.fecha_nacimiento.split("/")[0]
    };

    //Seteamos los campos del usuario
    this.usuario = {
      nombre: this.user.nombre,
      apellido: this.user.apellido,
      email: this.user.email,
      telefono: this.user.telefono,
      sexo: this.user.sexo,
      fecha_nacimiento: `${this.fecha_nacimiento.anio}/${this.fecha_nacimiento.mes}/${this.fecha_nacimiento.dia}`
    };

    this._paisService.getPaises()
      .subscribe(
        paises => {
          this.paises = paises.respuesta;
        },
        error => this.msgError(error._body)
      );

  }

  miCuenta(){

    this.cuenta = true;
    this.reservas = false;
    this.personales = false;
    this.cambiarContrasena = false;

    this.messageSuccess = "";
    this.messageError = "";

  }
  misReservas(){

    this.reservas = true;
    this.cuenta = false;
    this.personales = false;
    this.cambiarContrasena = false;

    this.messageSuccess = "";
    this.messageError = "";

    console.log()

  }

  datosPersonales(){

    this.personales= true;
    this.reservas = false;
    this.cuenta = false;
    this.cambiarContrasena = false;

    this.messageSuccess = this.messageSuccess != "" ? this.messageSuccess : "";
    this.messageError = this.messageError != "" ? this.messageError : "";

    //Seteamos los campos del domicilio
    if( JSON.parse(this.identity).domicilio != undefined ){
      this.haveDomicilio = true;
      this.idDomi = JSON.parse(this.identity).domicilio._id;

      let userId = JSON.parse(localStorage.getItem("identity"))._id;

      //Dejamos pasar medio segundo antes de hacer la consulta
      this._usuarioService.getUserById( userId, this.token )
        .subscribe(
          data => {
            if( data.respuesta != ""){

              this.domicilio.numero = data.respuesta.domicilio.numero;
              this.domicilio.calle = data.respuesta.domicilio.calle;
              this.domicilio.barrio = data.respuesta.domicilio.barrio;
              this.provincia._id = data.respuesta.domicilio.provincia;

              //Setear la provincia, llamar al servicio
              this._provinciaService.getProvincia(this.provincia._id, this.token)
                  .subscribe(
                    resp => {
                       this.paises = resp.respuesta.pais.nombre;
                      this.getProvincias(resp.respuesta.pais._id, true);
                    },
                    error => this.msgError(error._body)
                  );
              console.log(this.provincia._id);

            }
          },
          error => this.msgError(error._body)
        );

    }else{
      this.haveDomicilio = false;
    }
  }

  cambiarPass(){

    this.cambiarContrasena = true;
    this.personales= false;
    this.reservas = false;
    this.cuenta = false;

    this.messageSuccess = "";
    this.messageError = "";

  }

  guardarMisDatos(){
    this.loading = true;

    this._usuarioService.actualizarUsuario(this.usuario, this.token ,JSON.parse(localStorage.getItem("identity"))._id)
                         .subscribe(
                           resp => {
                             if(resp.respuesta){
                               this.loading = false;
                               this.messageSuccess = "Datos guardados correctamente";
                             }
                           },
                           error => this.msgError(error._body)
                         );

  }

  guardarDomicilio(){
    this.loading = true;
    this.domicilio.provincia = this.provincia._id;
    console.log("Domicilio: " + this.domicilio);

    if( this.haveDomicilio ){

      console.log("Entro al PUT, objeto enviado, id:" + this.idDomi);

      this._domicilioService.updateAddress( this.domicilio, this.token , this.idDomi )
          .subscribe(
            domicilio => {
              if( domicilio.mensaje != ""){
                this.messageSuccess = domicilio.mensaje;
                this.loading = false;
                this.changeIdentity();
                this.datosPersonales();
              }
            },
            error => this.msgError( error._body )
          );

    }else{

        let userId = JSON.parse(this.identity)._id;
        console.log("Entro al POST, objeto enviado: " + JSON.parse(this.identity)._id);
        this._domicilioService.addDomicilio( this.domicilio, this.token , userId )
            .subscribe(
              domicilio => {
                if( domicilio.mensaje != "" && domicilio.respuesta.domicilio != ""){
                  this.messageSuccess = domicilio.mensaje;
                  this.loading = false;
                  this.changeIdentity();
                  this.datosPersonales();
                }
              },
              error => this.msgError(error._body)
            );

    }

  }

  changePass(){
    this.loading = true;
  }


  msgError( msg:string ){
    let json = JSON.parse(msg);

    this.messageError = json.message;

    if (json.message == "" || json.message == null)
      this.messageError = "Se ha producido un error.";

    this.loading = false;
  }

  getProvincias(elementSelected:any, bol:boolean = false){
    let id:number = 0;

    if(bol){
      id = Number(elementSelected);
    }else{
      id = Number(elementSelected.value);
    }

    this.provincia.nombre = "";

    this._provinciaService.getProvincias(id)
         .subscribe(
           provincias => {
             this.provincias =  provincias.respuesta;
             //console.log(provincias);
           },
           error => this.msgError(error._body)
         );


  }

  changeProv( elementSelected:any ){
    this.provincia._id = elementSelected.value;
  }

  changeIdentity(){

    this._usuarioService.getUserById( JSON.parse(localStorage.getItem("identity"))._id, this.token )
      .subscribe(
        res => {
          localStorage.setItem("identity", res.respuesta);
          this.identity = JSON.stringify( localStorage.getItem("identity") );
          console.log(res);
        },
        error => this.msgError(error._body)
      );


  }
}
