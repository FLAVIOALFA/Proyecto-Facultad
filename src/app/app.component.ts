import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { UsuarioService } from "./services/usuario/usuario.service";
import { RoleService } from "./services/role/role.service";
import { LoginService } from "./services/login/login.service";
import { Usuario} from "./models/usuario.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   private title:String = 'Reserva de alojamientos';
   private login:any;
   private token:any;
   private identity:any;

   constructor( private auth:AuthService,
                  private _router: Router,
                  private _usuarioService : UsuarioService,
                  private _rolesServices : RoleService,
                  private _loginService: LoginService
                ){
     this.login = {
       email : "",
       password : ""
     };

     auth.handleAuthentication();
   }

   ngOnInit(){
      //Llamamos y obtenemos los roles!
      this._rolesServices.getRoles().subscribe(
        resp => {
          localStorage.setItem("roles", resp);
        },
        error => this.msgError(error._body)
      );

      let token = localStorage.getItem("token");
      let ident = localStorage.getItem("identity");

      if( token == null && ident == null){
        this.token = "";
        this.identity = "";
      }

   }

   doLogin(){
      this._loginService.doLogin(this.login)
           .subscribe(
             resp => {

               if( resp.token != null){
                  this.token = resp.token;
                 localStorage.setItem("token", this.token);
               }

               if (resp.identity != null){
                  this.identity = JSON.stringify(resp.identity);
                  console.log(resp.identity);
                  localStorage.setItem("identity", JSON.stringify(resp.identity));
               }

               this._router.navigate(["home"]);

             },
             error => this.msgError(error._body)
           );
   }

   salir(){

     this._loginService.logout();

     this.token = "";
     this.identity = null;

   }

   registrarse(){
      this._router.navigate(["usuarioAlta"]);
   }

   msgError( msg:string ){
     let json = JSON.parse(msg);
     alert(json.message);
   }
}
