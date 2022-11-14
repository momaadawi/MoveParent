import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { AbsenceService } from '../../services/absenceService/absence.service';
import { AbsenceRequest } from '../../services/absenceService/absence.model';
import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ParentStudent } from '../../services/studentService/models/Students.model';

@Component({
  selector: 'app-set-absetnt',
  templateUrl: './set-absetnt.component.html',
  styleUrls: ['./set-absetnt.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetAbsetntComponent implements OnInit, OnDestroy {
  private subsink = new SubSink()
  spinner: boolean = false;
  constructor(private _absenceService: AbsenceService,
              private _snakBar: MatSnackBar,
              public dialogRef: MatDialogRef<SetAbsetntComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ParentStudent) { }

  ngOnInit(): void {

  }

  set_student_as_Absent(){
    let absenceRequest: AbsenceRequest = {
      StudentsId: [this.data.Id],
      StartDate: this.data.studentDetails.ActualDate,
      EndDate: this.data.studentDetails.ActualDate,
      Name: '',
      Comment: ''
    }
    this.subsink.add(
    this._absenceService.setAbsense(absenceRequest).subscribe({
      next: res => {
        if(res.IsErrorState)
          this._snakBar.open(res.ErrorDescription, 'X', { duration: 3000 })
        else
          this._snakBar.open('studentd set as absent', 'X', { duration: 3000 })
      }
    })
    )
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe()
  }


}
