import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../configurations/app.config';
import { AbsenceRequest, AbsenceResponse } from './absence.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private _http: HttpClient) { }

  setAbsense(absenceRequest: AbsenceRequest): Observable<AbsenceResponse> {
    return this._http.post<AbsenceResponse>(environment.api + Configuration.api.absence, absenceRequest)
  }
}
