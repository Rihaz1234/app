import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-patient-admitted-modal',
  templateUrl: './patient-admitted-modal.component.html',
  styleUrls: ['./patient-admitted-modal.component.scss']
})
export class PatientAdmittedModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
