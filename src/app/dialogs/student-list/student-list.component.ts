import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/studentService/student.service';
import { SubSink } from 'subsink';
import { ParentStudent } from 'src/app/services/studentService/models/Students.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdatePOIComponent } from '../update-poi/update-poi.component';
import { SystemEnum } from 'src/app/configurations/system.enum';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;
  loader: boolean = false;
  private _dilaogConfig: MatDialogConfig = {
    panelClass: 'dialog_size',
  }
  updatePoiType!: SystemEnum.UpdatePoiState
  studnets: ParentStudent[] = []

  private subSink = new SubSink();
  constructor(private _studentService: StudentService,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.loader = true;
    this.subSink.add(
      this._studentService.get_Students()
        .subscribe({
          next: st => this.studnets = st.Value,
          complete: () => {
            this.loader = false;
          }
        })
    )
  }
  update_poi(student: ParentStudent, updateType: SystemEnum.UpdatePoiState) {
    var data = {
      student: student,
      updateType: updateType
    }
    this._dilaogConfig.data = data
    this._dilaogConfig.id = 'di_update_poi';
    this._dialog.open(UpdatePOIComponent, this._dilaogConfig)
  }
}
