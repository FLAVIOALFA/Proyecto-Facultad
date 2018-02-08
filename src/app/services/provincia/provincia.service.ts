import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { Http, Headers } from "@angular/http";

@Injectable()
export class ProvinciaService {

  private url:string = "http://localhost:3700/api";

  constructor( private _http: Http) { }

  getProvincias( id:number ){
    return this._http.get(this.url + "/provincias/"+id).map( res => res.json());
  }

  getProvincia( id:number, token:any ){
    let headers = new Headers({
      "Content-Type" : "application/json",
      "x-access-token" : token
    });

    return this._http.get(this.url + "/provincia/" + id, {headers : headers})
                .map(res => res.json());

  }

}
