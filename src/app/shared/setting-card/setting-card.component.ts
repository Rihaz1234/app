import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CFSummary } from "../../interfaces/query-params.interface";

@Component({
  selector: "app-setting-card",
  templateUrl: "./setting-card.component.html",
  styleUrls: ["./setting-card.component.scss"],
})
export class SettingCardComponent implements OnInit {
  constructor(private router: Router) {}
  @Output() fetchSummary: EventEmitter<any> = new EventEmitter();
  @Input() title: any;
  @Input() image: any;
  @Input() count: any;
  @Input() user: any;
  @Input() timerIcon: any;
  @Input() routerUrl: any;
  @Input() disabled: any;
  @Input() subTitle: any;
  @Input() view: boolean = true;
  @Input() showCount: boolean = true;
  @Input() loading: boolean = false;
  @Input() type: any;
  selectedTimeParam = null;
  timerList = [
    {
      time: "Current",
      value: 0,
    },
    {
      time: "30 mins",
      value: 30,
    },
    {
      time: "1 hour",
      value: 60,
    },
    {
      time: "3 hours",
      value: 3*60,
    },
    {
      time: "6 hours",
      value: 6*60,
    },
        // {
    //   time: "1 Day",
    //value: 24*60,
    // },
    //    //   time: "10 Days",
    //   value: 1000*24*60,
    // }
  ];

  ngOnInit(): void {
    if(this.type === 'parameter')
    this.selectedTimeParam = +window.sessionStorage.getItem("parameter-duration");
    else if (this.type === 'arrhythmia')
      this.selectedTimeParam = +window.sessionStorage.getItem("arrhythmia-duration");
    if (this.selectedTimeParam === undefined) {
      this.selectedTimeParam = 360;
    }

  }

  navigateUrl(url: string) {
    this.router.navigate([url]).then();
  }

  // Alert fetch
  changeDuration(event: any, type: string) {
    const param: CFSummary = {};
    switch (type) {
      case "parameter":
        param.parameterAlertsFrom = event.value;
        param.arrhythmiaAlertsFrom = window.sessionStorage.getItem("arrhythmia-duration");
        if(param.arrhythmiaAlertsFrom === undefined)
          param.arrhythmiaAlertsFrom = '360';
        this.selectedTimeParam = event.value;
        window.sessionStorage.setItem("parameter-duration", this.selectedTimeParam);
        break;
      case "arrhythmia":
        param.arrhythmiaAlertsFrom = event.value;
        param.parameterAlertsFrom = window.sessionStorage.getItem("parameter-duration");
        if(param.parameterAlertsFrom === undefined)
          param.parameterAlertsFrom = '360';
        this.selectedTimeParam = event.value;
        window.sessionStorage.setItem("arrhythmia-duration", this.selectedTimeParam);
        break;
      default:
        break;
    }
    this.fetchSummary.emit(param);
  }

  getTimeName(value){
    return this.timerList.find(t => t.value === value)?.time || "6h";
  }

  checkUrl(url : string){
    if(this.title && url && this.view){
      this.router.navigate([url]).then();
    }
  }
}
