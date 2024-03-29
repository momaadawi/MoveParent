import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../configurations/app.config';
import { AbsenceRequest, AbsenceResponse, Reasons, AbsenceReasonsResponse, SetStudentAbsentInProgressTripRequest } from './absence.model';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private _http: HttpClient) { }

  getAbsence(): Observable<AbsenceResponse>{
    return this._http.get<AbsenceResponse>(environment.api + Configuration.api.absence)
  }

  setAbsense(absenceRequest: AbsenceRequest): Observable<AbsenceResponse> {
    return this._http.post<AbsenceResponse>(environment.api + Configuration.api.absence, absenceRequest)
  }

  updateAbsence(absenceRequest: AbsenceRequest): Observable<AbsenceResponse>{
    return this._http.put<AbsenceResponse>(environment.api + Configuration.api.absence, absenceRequest)
  }

  deleteAbsence(absencePlan_id: number): Observable<AbsenceResponse>{
    return this._http.delete<AbsenceResponse>(environment.api + Configuration.api.absence + '/' + absencePlan_id)
  }
  SetStudentAbsentInProgressTrip(absenceRequest: SetStudentAbsentInProgressTripRequest): Observable<AbsenceResponse>{
    return this._http.post<AbsenceResponse>(environment.api + Configuration.api.absenceStudentForInProgressTrip, absenceRequest)
  }
  lookUp_reasons(): Observable<AbsenceReasonsResponse>{
    return this._http.get<AbsenceReasonsResponse>(environment.api + Configuration.api.absenceReason)
  }
}
