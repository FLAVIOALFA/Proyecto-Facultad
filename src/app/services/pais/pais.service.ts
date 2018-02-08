import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { Observable} from "rxjs/Observable";
import { Http } from "@angular/http";

@Injectable()
export class PaisService {

  private url:string = "http://localhost:3700/api";

  constructor( private _http: Http ) { }

  getPaises(){

    return this._http.get(this.url+"/paises").map( res => res.json());

  }

}
