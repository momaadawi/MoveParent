import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/studentService/student.service';
import { SubSink } from 'subsink';
import { ParentStudent } from 'src/app/services/studentService/models/Students.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdatePOIComponent } from '../update-poi/update-poi.component';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslateService } from '../../services/customTranslateService/custom-translate.service';
import { DialogServiceService } from '../../shared/services/dialog-service.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;
  loader: boolean = false;
  updatePoiType!: SystemEnum.UpdatePoiState
  studnets: ParentStudent[] = []

  private subSink = new SubSink();
  constructor(private _studentService: StudentService,
    private _dialogService: DialogServiceService,
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
    let config = this._dialogService.fullSize_dialogConfig();
    config.data = { student: student, updateType: updateType }
    config.id = 'di_update_poi';
    this._dialog.open(UpdatePOIComponent, config)
  }
}
