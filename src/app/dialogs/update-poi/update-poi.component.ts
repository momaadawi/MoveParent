import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-update-poi',
  templateUrl: './update-poi.component.html',
  styleUrls: ['./update-poi.component.scss']
})
export class UpdatePOIComponent implements OnInit {
  private _dilaogConfig: MatDialogConfig = {
    panelClass: 'dialog_size'
  }


  constructor() { }

  ngOnInit(): void {
  }

}
