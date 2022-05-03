import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL ='http://localhost:8000';
  }

  register(payload: Object){
    return this.http.post(`${this.ROOT_URL}/api/user/register`, payload);
  }
  login(payload: Object){
    return this.http.post(`${this.ROOT_URL}/api/user/login`, payload, {withCredentials: true});
  }
  getUser(){
    return this.http.get(`${this.ROOT_URL}/api/user/user`, {withCredentials: true});
  }
  logout(){
    return this.http.post(`${this.ROOT_URL}/api/user/logout`,{}, {withCredentials: true});

  }
}
