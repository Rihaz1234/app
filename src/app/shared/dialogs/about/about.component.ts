import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
// import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-hospital",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
  uiVersion: string = environment.version.toUpperCase();
  ep4Version: string;
  ep3Version: string;
  constructor(
    // private dialogRef: MatDialogRef<AboutComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) { }

  ngOnInit() {
    let apiURL = `${environment.dataApiUrl}info/version`;
    return this.http
      .get<{
        data: {
          EP3: string;
          EP4: string;
        }
      }>(apiURL).subscribe(resp => {
        const versions = resp?.data;
        this.ep3Version = versions?.EP3?.toUpperCase();
        this.ep4Version = versions?.EP4?.toUpperCase();
      });
  }
}
