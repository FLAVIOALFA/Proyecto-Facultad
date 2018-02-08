import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Usuario } from "../../models/usuario.model";
import { NgClass } from '@angular/common';
import { UsuarioService } from "../../services/usuario/usuario.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public titulo:string= "";
  public dias:string[];
  public meses:string[];
  public anios:number[];
  public bol:boolean= false;
  public message:string;
  public usuario: Usuario = new Usuario();

  constructor( private _usuarioService : UsuarioService,
                private _router : Router ) {
    this.titulo = "Crear una cuenta";

  }

  ngOnInit() {
    this.dias = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"
                 ,"16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    this.meses = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    let array = [];

    for(let i = new Date().getFullYear(); i >= 1900; i--){
      array.push(i);
    }

    this.anios = array;
  }

  guardar( formulario:NgForm ){


    let fecha_nacimiento = `${formulario.value.anio}/${formulario.value.mes}/${formulario.value.dia}`;

    this.usuario.fecha_nacimiento = fecha_nacimiento;

    if(formulario.value.pass !== formulario.value.pass2){
      this.bol = true;
      alert("Las contraseñas no coinciden");
      return this.bol;
    }

    //En esta parte creo que ya debería haber mandado el post.

    this._usuarioService.crearUsuario( this.usuario )
        .subscribe(
          resp => {

            this._router.navigate(["home"]);
          },
          error => this.msgError(error._body)
          );



  }

  msgError( msg:string ){
    let json = JSON.parse(msg);
    alert(json.message);
  }

}
