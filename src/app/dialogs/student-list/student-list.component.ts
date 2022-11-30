import { Component, NgZone, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { StudentService } from '../../services/studentService/student.service';
import { SubSink } from 'subsink';
import { ParentStudent } from 'src/app/services/studentService/models/Students.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePOIComponent } from '../update-poi/update-poi.component';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { CustomDialogService } from '../../shared/services/customDialogService/customDialog.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;
  private _subSink = new SubSink();
  loader: boolean = false;
  updatePoiType!: SystemEnum.UpdatePoiState
  studnets: ParentStudent[] = []

  constructor(private _studentService: StudentService,
    private _dialogService: CustomDialogService,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.loader = true;

    let getStudent_subscription = this._studentService.get_Students()
      .subscribe({
        next: st => this.studnets = st.Value,
        complete: () => {
          this.loader = false;
        }
      })
    this._subSink.add(getStudent_subscription)
  }
  update_poi(student: ParentStudent, updateType: SystemEnum.UpdatePoiState) {
    let config = this._dialogService.fullSize_dialogConfig();
    config.data = { student: student, updateType: updateType }
    config.id = 'di_update_poi';
    this._dialog.open(UpdatePOIComponent, config)
  }
  ngOnDestroy(): void {
    this._subSink.unsubscribe()
  }

}
