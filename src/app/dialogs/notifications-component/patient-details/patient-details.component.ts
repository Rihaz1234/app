import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserPreferenceService } from "@services/user-preference.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-patient-details",
  templateUrl: "./patient-details.component.html",
  styleUrls: ["./patient-details.component.scss"],
})
export class PatientDetailsComponent implements OnInit {
  constructor(private userPreference: UserPreferenceService) { }
  @Input() patientData: any;
  @Output() acknowledgeAllType = new EventEmitter<string>();
  @Output() acknowledgeAllEvents = new EventEmitter<string>();
  @Output() addEvent = new EventEmitter<string>();
  @Input() updated: any;
  @Input() activeEvents;
  @Input() eventEditAccess = false;
  @Input() count = {
    current: 0,
    unAcknowledged: 0
  };
  @Input() tab: any;
  @Input() activeAlert = false;
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;

  ngOnInit(): void {
    this.timeZone = this.userPreference.getUserTimeZone();
  }
  acknowledgeAll() {
    this.acknowledgeAllType.emit();
  }
  addNewEvent() {
    this.addEvent.emit();
  }
  acknowledgeAllEvent() {
    this.acknowledgeAllEvents.emit();
  }
}
