import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { Http, Headers } from "@angular/http";
import { Domicilio} from "../../models/domicilio.model";

@Injectable()
export class DomicilioService {

  private url:string = "http://localhost:3700/api";

  constructor( private _http: Http ) { }

  getAddress( id:number, token:any ){
    let headers = new Headers({
      "Content-Type" : "application/json",
      "x-access-token" : token
    });

    return this._http.get(this.url + "/domicilio/"+id, { headers : headers })
                .map(res => res.json());
  }

  addDomicilio( address: Domicilio, token :any ,id:number ){

      let headers = new Headers({
        "Content-Type" : "application/json",
        "x-access-token" : token
      });

      return this._http.post(this.url + "/domicilio/" + id, address, { headers : headers })
                  .map(res => res.json());

  }

  updateAddress( address: Domicilio, token:any ,id:number ){
    let headers = new Headers({
      "Content-Type": "application/json",
      "x-access-token" : token
    });

    return this._http.put(this.url + "/address/" + id, address, { headers: headers })
                      .map(res => res.json());

  }

}
