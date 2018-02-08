import { Injectable } from '@angular/core';
import { Usuario } from "../../models/usuario.model";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  private url:string = "http://localhost:3700/api";

  constructor( private _http:Http ) { }

  getUserById( id:number, token:any ){
    let headers = new Headers({
      "Content-Type" : "application/json",
      "x-access-token" : token
    });

    return this._http.get(this.url + "/usuario/" + id, { headers : headers })
        .map(res => res.json());

  }

  crearUsuario( usuario:Usuario){

    let headers = new Headers({
      "Content-Type" : "application/json"
    });

    return this._http.post(this.url + "/usuario", usuario, { headers : headers })
               .map( res => res.json());

  }

  actualizarUsuario( usuario:any, token:any ,id:number ){
    let headers = new Headers({
      "Content-Type" : "application/json",
      "x-access-token" : token
    });

    return this._http.put(this.url + "/usuario/"+id, usuario, { headers : headers })
              .map( res => res.json());
  }

}
