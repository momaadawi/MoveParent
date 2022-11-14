import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../configurations/app.config';
import { AbsenceRequest, AbsenceResponse } from './absence.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private _http: HttpClient) { }

  setAbsense(absenceRequest: AbsenceRequest): Observable<AbsenceResponse> {
    return this._http.post<AbsenceResponse>(Configuration.api.absence, absenceRequest)
  }
}
