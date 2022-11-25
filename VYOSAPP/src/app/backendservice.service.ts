import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { User } from './parameters';
import { InterfaceName } from './parameters';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
  baseurl = "/"

  constructor(private http:HttpClient) { }



public InitialConfig(interfacename:any):Observable<InterfaceName>{
  return this.http.get<any>(this.baseurl+"initial-config/"+interfacename);
}

public NetworkTraffic(User): Observable<User> {
    return this.http.post<any>(this.baseurl+"traffic-policy",User);
}


}

