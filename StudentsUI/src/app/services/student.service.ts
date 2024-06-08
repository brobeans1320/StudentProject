import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'Student';

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${environment.apiURL}/${this.url}/getStudents`
    );
  }

  public createStudent(student: Student) {
    return this.http.post(
      `${environment.apiURL}/${this.url}/createStudent`,
      student
    );
  }

  public updateStudent(student: Student) {
    return this.http.put(
      `${environment.apiURL}/${this.url}/updateStudent`,
      student
    );
  }

  public deleteStudent(student: Student): Observable<Number> {
    return this.http.delete<Number>(
      `${environment.apiURL}/${this.url}/deleteStudent/${student.id}`
    );
  }
}