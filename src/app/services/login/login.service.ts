import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { Http, Headers } from "@angular/http";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {

  private url:string = "http://localhost:3700/api";

  constructor( private _http:Http, private _router: Router ) { }

  doLogin( login:any ){

    let headers = new Headers({
      "Content-Type" : "application/json"
    });

    return this._http.post(this.url + "/login", login, { headers : headers })
      .map( res => res.json());

  }

  logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("identity");

    location.href = "http://localhost:4200/home";

  }

}
