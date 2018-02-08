import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import { Observable} from "rxjs/Observable";

@Injectable()
export class RoleService {

  private url:string = "http://localhost:3700/api";
  constructor( private _http: Http) { }

  getRoles(){
    return this._http.get(this.url + "/roles").map( resp => resp.json());
  }

}
