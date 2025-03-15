import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/User/'; 

  constructor(private httpClient: HttpClient) {}

  public login(loginData: any): Observable<any> {
    console.log(loginData);
    return this.httpClient.post(`${this.apiUrl}/LoginAuth`, {
       
 email:"ajay@gmail.com",
  password:"Ajay@123"
    });
}
}