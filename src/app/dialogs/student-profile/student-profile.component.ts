import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/services/studentService/models/student.model';
import { StudentService } from '../../services/studentService/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubSink } from 'subsink';
import { ParentStudent } from '../../services/studentService/models/Students.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  private _subSink = new SubSink()
  spinner: boolean = false;
  profileForm!: FormGroup;
  student!: Student;

  constructor(private _studentService: StudentService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private studentData: ParentStudent){}

  ngOnInit(): void {
    this.profileForm = this.create_profileForm()
   let studentSubscription = this._studentService.get_student_by_id(this.studentData.Id).subscribe({
      next: res => {
        this.student = res.Value
      },
      error: err => {

      },
      complete: () => {

      }
    })
    this._subSink.add(studentSubscription)
  }
  create_profileForm(){
    return this._fb.group({
      'gender': [''],

    })
  }
  seed_profileForm(){
    this.profileForm.patchValue({

    })
  }
  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

}
