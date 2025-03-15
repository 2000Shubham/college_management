import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/api/User';

  constructor(private httpClient: HttpClient) { }

  public getUserList(): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/getUserList`, {});
  }

  public addUserList(userData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/saveUser`,
      {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role_id: userData.role
      }
    );
  }

    public getUser_role(): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/getUserRole`,{}
    );
  }

  public deleteUser(id: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/deleteUserById`,
      {
        id:id
      }
    );
  }

  public getUserListById(id: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/getUserListById/${id}`, {});
  }
  
  public updateUser(id: number, updatedUser: any): Observable<any> {
    console.log(updatedUser);
    return this.httpClient.post(`${this.apiUrl}/updateUser`, {
        id: id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        role_id:updatedUser.role_name
    });
}

}
