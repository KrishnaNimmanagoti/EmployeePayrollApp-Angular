import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createEmployee(data: any){
    return this.http.post('http://localhost:8080/employeepayroll',data);
  }

  getEmployee(id: any){
    return this.http.get('http://localhost:8080/employeepayroll/' + id);
  }

  getEmployeeList(){
    return this.http.get('http://localhost:8080/employeepayroll');
  }

  updateEmployee(data: any, id: any){
    return this.http.put('http://localhost:8080/employeepayroll/' + id ,data);
  }

  deleteEmployee(id: any){
    return this.http.delete('http://localhost:8080/employeepayroll/' + id);
  }
}
