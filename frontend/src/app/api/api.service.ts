import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private readonly API_URL = environment.API;

  constructor(private http : HttpClient) { }

  postUser(data : any){
    return this.http.post<any>(`${this.API_URL}/posts`, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }
  getUser(){
    return this.http.get<any>(`${this.API_URL}/posts`)
    .pipe(map((res:any) => {      
      return res;
    }))
  }
  updateUser(data : any, id: number){
    return this.http.put<any>(`${this.API_URL}/posts/${id}`, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }
  deleteUser(id : number){
    return this.http.delete<any>(`${this.API_URL}/posts/${id}`)
    .pipe(map((res:any) => {
      return res;
    }))
  }

}
