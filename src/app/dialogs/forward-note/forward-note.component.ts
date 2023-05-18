import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-forward-note",
  templateUrl: "./forward-note.component.html",
  styleUrls: ["./forward-note.component.scss"],
})
export class ForwardNoteComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MatDialogRef<any>>
  ) { }

  forwardNoteForm: FormGroup;

  ngOnInit(): void {
    this.forwardNoteForm = this.formBuilder.group(
      {
        priority: ["", [Validators.required]],
        note: ["", [Validators.pattern("^[a-zA-Z0-9]{1}[°%&.()/a-zA-Z0-9 ',-:\n]*$")]],
      });
  }

  get noteForm(){
    return this.forwardNoteForm.controls;
  }

  submit() {
    if (this.forwardNoteForm.valid) {
      this.dialogRef.close({
        notes: this.forwardNoteForm.value.note,
        alertTag: this.forwardNoteForm.value.priority
      });
    }
  }
}
