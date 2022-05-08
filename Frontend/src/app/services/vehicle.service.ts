import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL ='http://localhost:8000';
  }
  //getOne
  get(id:any): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/api/veh/onecar/${id}`,{withCredentials: true});
  }
  //get my cars
  getMyCars(){
    return this.http.get(`${this.ROOT_URL}/api/veh/listmycars`, {withCredentials: true})
  }
  // add a car
  create(payload: Object){
    return this.http.post(`${this.ROOT_URL}/api/veh/add`, payload,{withCredentials: true});
  }
  // Update a car
  update(id: any,payload: Object): Observable<any> {
    return this.http.put(`${this.ROOT_URL}/api/veh/update/${id}`, payload,{withCredentials: true});
  }
  // Delete a car
  delete(id: any): Observable<any>{
    return this.http.delete(`${this.ROOT_URL}/api/veh/delete/${id}`, {withCredentials:true})
  }
  //find by CarName
  findByCarName(name: any):Observable<any>{
    return this.http.get(`${this.ROOT_URL}/api/veh/carname/${name}`);
  }

}
