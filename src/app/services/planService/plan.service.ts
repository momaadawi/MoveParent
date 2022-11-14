import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Configuration } from '../../configurations/app.config';
import { PlanResponse } from './plan.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private _http: HttpClient) { }

   getPlan(studentId: number): Observable<PlanResponse>{
    let param = new HttpParams().set('id', studentId)
    return this._http.get<PlanResponse>(Configuration.api.Plans.Get, { params: param })
  }
}
