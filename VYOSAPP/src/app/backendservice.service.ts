import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { User } from './parameters';
import { InterfaceName } from './parameters';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
  baseurl = "http://127.0.0.1:5000/"

  constructor(private http:HttpClient) { }

public InterfaceStatus(interfacename:any):Observable<InterfaceName>{
  return this.http.get<any>(this.baseurl+"trafficpolicy/"+interfacename);
}

public Parameters(interfacename:any):Observable<InterfaceName>{
  return this.http.get<any>(this.baseurl+"parameters/"+interfacename);
}

public NetworkTraffic(User): Observable<User> {
    return this.http.post<any>(this.baseurl+"trafficpolicy",User);
}


}

