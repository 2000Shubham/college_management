import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:5000/api/products'; 

  constructor(private httpClient: HttpClient) { }

  public saveStudent(formData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/saveStudentList`, {
      name: formData.name,
      course: formData.course,
      email: formData.email,
      phone: formData.phone
    });
  }

  public getStudentList(): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/getStudent`, {});
  }

  public getStudentListById(id: number): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/getStudentListById/${id}`, {});
  }

  public updateStudent(id: number, updatedStudent: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/updateStudent`, {
        id: id,
        name: updatedStudent.name,
        course: updatedStudent.course,
        email: updatedStudent.email,
        phone: updatedStudent.phone
    });
}

public deleteStudentById(id: number): Observable<any> {
 //console.log(id);
  return this.httpClient.post(`${this.apiUrl}/deleteStudentById/${id}`, {});
}
}
