import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/studentService/student.service';
import { SubSink } from 'subsink';
import { ParentStudent } from 'src/app/services/studentService/models/Students.model';
import {MatMenuTrigger} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePOIComponent } from '../update-poi/update-poi.component';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  studnets: ParentStudent[] = []
  
  private subSink = new SubSink();
  constructor(private _studentService: StudentService,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.subSink.add(
      this._studentService.get_Students()
        .subscribe({
          next: st => this.studnets = st.Value
        })
    )
  }
  update_poi(){
    this._dialog.open(UpdatePOIComponent)
  }

}
