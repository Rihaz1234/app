import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar, private translate: TranslateService) { }

  openSnackBar(message, verticalPosition, horizontalPosition, translateText = false, prefix = '', suffix = '') {
    if (translateText) {
      this.translate.get(message).subscribe((tran) => {
        this.snackBar.open(prefix + tran + suffix, "", {
          duration: environment.customization.snackBarDuration,
          verticalPosition: verticalPosition,
          horizontalPosition: horizontalPosition
        });
      });
    } else {
      this.snackBar.open(message, "", {
        duration: environment.customization.snackBarDuration,
        verticalPosition: verticalPosition, // 'top' | 'bottom'
        horizontalPosition: horizontalPosition // 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }
  }

  openCustomSnackBar(message, verticalPosition, horizontalPosition, translateText = false, prefix = '', suffix = '') {
    if (translateText) {
      this.translate.get(message).subscribe((tran) => {
        this.snackBar.open(prefix + tran + suffix, "", {
          duration: environment.customization.snackBarDuration,
          verticalPosition: verticalPosition,
          horizontalPosition: horizontalPosition,
          panelClass: "custom-snackbar"
        });
      });
    } else {
      this.snackBar.open(message, "", {
        duration: environment.customization.snackBarDuration,
        verticalPosition: verticalPosition, // 'top' | 'bottom'
        horizontalPosition: horizontalPosition, // 'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: "custom-snackbar"
      });
    }
  }
}
