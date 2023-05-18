import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { SendOtpQrComponent } from "../../../dialogs/manage-relays/send-otp-qr/send-otp-qr.component";
import { AuthenticationService } from "@services/authentication.service";
import { SinglePatientRelaysComponent } from "../single-patient-relays/single-patient-relays.component";
import { MultiPatientRelaysComponent } from "../multi-patient-relays/multi-patient-relays.component";
import { AddRelayComponent } from "../add-relay/add-relay.component";

@Component({
  selector: "app-manage-relays",
  templateUrl: "./manage-relays.component.html",
  styleUrls: ["./manage-relays.component.scss"],
})
export class ManageRelaysComponent implements OnInit {
  @ViewChild(SinglePatientRelaysComponent)
  private singlePatientRelayComponent: SinglePatientRelaysComponent;
  @ViewChild(MultiPatientRelaysComponent)
  private multiPatientRelayComponent: MultiPatientRelaysComponent;
  selectedTab = "sprelay";
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private autheticationService: AuthenticationService
  ) {}
  searchString = "";
  cfId = "";
  roles = [];
  role = "";
  editAccessSPR = false;
  editAccessMPR = false;
  editAccessRelayConfiguration = false;
  relaySelected: boolean;
  ngOnInit() {
    this.cfId = this.autheticationService.getCfId();
    this.roles = this.autheticationService.getRoles();
    this.relaySelected = false;
    if (this.roles.indexOf("CFA") > -1 || this.roles.indexOf("CFAC") > -1) {
      this.role = "CFA";
      this.editAccessSPR = true;
      this.editAccessMPR = true;
      this.editAccessRelayConfiguration = true;
    } else if (this.roles.indexOf("SC") > -1) {
      this.role = "SC";
      this.editAccessSPR = true;
    } else {
      this.role = this.roles[0];
    }
    console.log(this.relaySelected);
  }
  selectTab(value) {
    this.searchString = "";
    this.selectedTab = value;
  }
  navigateUrl(url: string) {
    this.router.navigate([url]).then();
  }
  getDate(timestamp) {
    let DateString = new Date(timestamp * 1000);
    let date = DateString.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    let time = DateString.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return date + " / " + time;
  }
  openQrDialog() {
    const dialogRef = this.dialog.open(SendOtpQrComponent, {
      width: "400px",
      maxWidth: "90vw",
      height: "auto",
      maxHeight: "90vh",
      panelClass: "custom-modal-managerelay",
      // disableClose: true,
      backdropClass: "backdropBackground",
    });
  }

  addRelay() {
    this.multiPatientRelayComponent.addRelay();
  }
  search() {
    this.searchString = (<HTMLInputElement>(
      document.getElementById("search")
    )).value;
  }
  clear(){
    this.searchString = "";
  }
  deleteRelays() {
    if (this.selectedTab === "sprelay") {
      this.singlePatientRelayComponent.confirmDelete();
    } else if (this.selectedTab === "mprelay") {
      this.multiPatientRelayComponent.confirmDelete();
    }
  }
  relaysSelected(event) {
    this.relaySelected = event;
  }
}
