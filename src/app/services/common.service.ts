import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  private hidePrameterAlertEdit = new BehaviorSubject<boolean>(false);
  parameterAlertEditHide = this.hidePrameterAlertEdit.asObservable();

  private hideArrhythmiaPrameterAlertEdit = new BehaviorSubject<boolean>(false);
  arrhythmiaParameterAlertEditHide = this.hideArrhythmiaPrameterAlertEdit.asObservable();

  private hideTechnicalAlertEdit = new BehaviorSubject<boolean>(false);
  technicalAlertEditHide = this.hideTechnicalAlertEdit.asObservable();

  private hidePriorityAlertEdit = new BehaviorSubject<boolean>(false);
  priorityAlertEditHide = this.hidePriorityAlertEdit.asObservable();

  private showSettingsAlertActionButtons = new BehaviorSubject<boolean>(false);
  settingsAlertActionButtonsShow =this.showSettingsAlertActionButtons.asObservable(); 

  private savePrameterAlertEdit = new BehaviorSubject<boolean>(false);
  parameterAlertEditSubmit = this.savePrameterAlertEdit.asObservable();

  private saveArrhythmiaPrameterAlertEdit = new BehaviorSubject<boolean>(false);
  arrhythmiaParameterAlertEditSubmit = this.saveArrhythmiaPrameterAlertEdit.asObservable();
  private saveTechnicalAlertEdit = new BehaviorSubject<boolean>(false);
  technicalAlertEditSubmit = this.saveTechnicalAlertEdit.asObservable();

  private savePriorityAlertEdit = new BehaviorSubject<boolean>(false);
  priorityAlertEditSubmit = this.savePriorityAlertEdit.asObservable();

  private hideDestinationAlertEdit = new BehaviorSubject<boolean>(false);
  destinationAlertEditHide = this.hideDestinationAlertEdit.asObservable();

  private hideNotificationAlertEdit = new BehaviorSubject<boolean>(false);
  notificationAlertEditHide = this.hideNotificationAlertEdit.asObservable();

  private saveNotificationAlertEdit = new BehaviorSubject<boolean>(false);
  notificationAlertEditSubmit = this.saveNotificationAlertEdit.asObservable();

  private saveDestinationAlertEdit = new BehaviorSubject<boolean>(false);
  destinationAlertEditSubmit = this.saveDestinationAlertEdit.asObservable();

  constructor() {}

  setParameterAlertEditHide(isHide: boolean) {
    this.hidePrameterAlertEdit.next(isHide);
  }

  setArrhythmiaParameterAlertEditHide(isHide: boolean) {
    this.hidePrameterAlertEdit.next(isHide);
  }

  setTechnicalAlertEditHide(isHide: boolean) {
    this.hideTechnicalAlertEdit.next(isHide);
  }

  setPriorityAlertEditHide(isHide: boolean) {
    this.hidePriorityAlertEdit.next(isHide);
  }

  setSettingsAlertActionButtons(isShow: boolean) {
    this.showSettingsAlertActionButtons.next(isShow);
  }

  setParameterAlertEditSubmit(isSubmit: boolean) {
    this.savePrameterAlertEdit.next(isSubmit);
  }

  setArrhythmiaParameterAlertEditSubmit(isSubmit: boolean) {
    this.saveArrhythmiaPrameterAlertEdit.next(isSubmit);
  }

  setTechnicalAlertEditSubmit(isSubmit: boolean) {
    this.saveTechnicalAlertEdit.next(isSubmit);
  }
  setPriorityAlertEditSubmit(isSubmit: boolean) {
    this.savePriorityAlertEdit.next(isSubmit);
  }

  setDestinationAlertEditHide(isHide: boolean) {
    this.hideDestinationAlertEdit.next(isHide);
  }

  setNotificationAlertEditHide(isHide: boolean) {
    this.hideNotificationAlertEdit.next(isHide);
  }

  setNotificationAlertEditSubmit(isSubmit: boolean) {
    this.saveNotificationAlertEdit.next(isSubmit);
  }

  setDestinationAlertEditSubmit(isSubmit: boolean) {
    this.saveDestinationAlertEdit.next(isSubmit);
  }
  convertSecToHrs(seconds) {
    return seconds/3600;
  }
  convertHrtoSecs(hours) {
    return hours*3600;
  }
}
