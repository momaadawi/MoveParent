import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ParentStudentsResponse } from './models/Students.model';
import { Configuration } from 'src/app/configurations/app.config';
import { Observable } from 'rxjs';
import { StudentResponse } from './models/student.model';
import { UpdatePOIResponse, UpdatePOIRequest } from './models/POI.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private _http: HttpClient) { }

  get_Students(): Observable<ParentStudentsResponse> {
    return this._http.get<ParentStudentsResponse>(Configuration.api.Parents.students)
  }
  get_student_by_id(studnetId: number) {
    let params = new HttpParams().set('id', studnetId)
    return this._http.get<StudentResponse>(Configuration.api.student.getStudentById, { params: params })
  }
  update_student_POI(poiRequest: UpdatePOIRequest) {
    return this._http.put<UpdatePOIResponse>(Configuration.api.student.updateStudentPOI, poiRequest)
  }
}
