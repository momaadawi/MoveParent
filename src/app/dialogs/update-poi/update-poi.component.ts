import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Student } from '../../services/studentService/models/student.model';
import { ParentStudent } from '../../services/studentService/models/Students.model';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { StudentService } from '../../services/studentService/student.service';
import { UpdatePOIRequest } from '../../services/studentService/models/POI.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubSink } from 'subsink';
import { Configuration } from '../../configurations/app.config';
import { cssClasses } from '../../shared/cssClasses.conf';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';

@Component({
  selector: 'app-update-poi',
  templateUrl: './update-poi.component.html',
  styleUrls: ['./update-poi.component.scss']
})
export class UpdatePOIComponent implements OnInit, OnDestroy {
  private subsin: SubSink = new SubSink();
  spinner: boolean = false;
  student!: Student
  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
  };
  student_position!: google.maps.LatLngLiteral;
  mapOptions: google.maps.MapOptions = {
    zoom: 12
  }


  constructor(private _studentService: StudentService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _customTranslate: CustomTranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { student: ParentStudent; updateType: SystemEnum.UpdatePoiState; }) {
  }

  ngOnInit(): void {
    this.get_student_By_id();
  }

  get_student_By_id() {
    this.subsin.add(
      this._studentService.get_student_by_id(this.data.student.Id).subscribe({
        next: res => {
          this.student = res.Value;
          if (this.data.updateType == SystemEnum.UpdatePoiState.UpdatePickUpLocation) {
            this.student_position = { lng: Number(res.Value.PickLocationLongitude), lat: Number(res.Value.PickLocationLatitude) }
            this.mapOptions.center = { lng: Number(res.Value.PickLocationLongitude), lat: Number(res.Value.PickLocationLatitude) }
          }
          if (this.data.updateType == SystemEnum.UpdatePoiState.updateDropOffLocation) {
            this.student_position = { lng: Number(res.Value.DropOffLongitude), lat: Number(res.Value.DropOffLatitude) }
            this.mapOptions.center = { lng: Number(res.Value.DropOffLongitude), lat: Number(res.Value.DropOffLatitude) }
          }
        },
        complete: () => {
        }
      })
    )
  }
  mapClick(event: google.maps.MapMouseEvent) {
    this.student_position = event.latLng!.toJSON()
    console.log(this.student_position)
  }
  update_student_POI() {
    this.spinner = true;
    let request: UpdatePOIRequest = {
      StudentId: this.data.student.Id,
      PickLocationLongitude: this.student.PickLocationLongitude,
      PickLocationLatitude: this.student.PickLocationLatitude,
      DropOffLongitude: this.student.DropOffLongitude,
      DropOffLatitude: this.student.DropOffLatitude
    }
    if (this.data.updateType == SystemEnum.UpdatePoiState.UpdatePickUpLocation) {
      request.PickLocationLongitude = this.student_position.lng.toString()
      request.PickLocationLatitude = this.student_position.lat.toString()
    }
    if (this.data.updateType == SystemEnum.UpdatePoiState.updateDropOffLocation) {
      request.DropOffLongitude = this.student_position.lng.toString()
      request.DropOffLatitude = this.student_position.lat.toString()
    }
    this.subsin.add(
      this._studentService.update_student_POI(request).subscribe({
        next: res => {
          if (res.IsErrorState)
            this._snackBar.open(res.ErrorDescription, 'x', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
          else{
            this._dialog.getDialogById('di_update_poi')?.close()
            this._snackBar.open(this._customTranslate.translate('snack-bar.student_location_updated'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.success] })
          }
        },
        error: err =>{
          this._snackBar.open(this._customTranslate.translate('snack-bar.something_wrong_retry_again'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
        },
        complete:() =>{
          this.spinner = false
        }
      }))
  }
  ngOnDestroy(): void {
    this.subsin.unsubscribe()
  }
}
