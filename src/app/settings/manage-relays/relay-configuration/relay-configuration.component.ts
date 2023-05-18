import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ManageRelaysService } from "../services/manage-relays.service";
import { RelayConfiguration } from "../../../interfaces/manage-relays.interface";
import { Observable } from "rxjs";
import {
  ManageRelaysSelectors,
  ManageRelaysStoreActions,
  ManageRelaysStoreState,
} from "../store";
import { Store } from "@ngrx/store";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-relay-configuration",
  templateUrl: "./relay-configuration.component.html",
  styleUrls: ["./relay-configuration.component.scss"],
})
export class RelayConfigurationComponent implements OnInit, OnDestroy {
  constructor(
    private service: ManageRelaysService,
    private store$: Store<ManageRelaysStoreState.ManageRelaysState>,
    private snackbar: SnackbarService
  ) {}
  settings = [];
  @Input() public editAccess;
  loader = true;
  loaderSubscription: any;
  configSubscription: any;
  relayConfig$: Observable<RelayConfiguration>;
  relayConfiguration: RelayConfiguration;
  ngOnInit(): void {
    for (let i = 30; i <= 180; i++) {
      this.settings.push({
        name: i + "  days",
        value: i * 24 * 60,
      });
    }
    this.relayConfig$ = this.store$.select(
      ManageRelaysSelectors.getRelayConfiguration
    );
    this.configSubscription = this.relayConfig$.subscribe((response) => {
      console.log(response);
      this.relayConfiguration = response;
    });
    this.loaderSubscription = this.store$
      .select(ManageRelaysSelectors.getLoaderStatus)
      .subscribe((loader) => {
        if (loader) {
          this.loader = false;
        }
      });
    this.getRelayConfiguration();
  }
  getRelayConfiguration() {
    this.store$.dispatch(
      new ManageRelaysStoreActions.LoadRelayConfigurationRequestAction({})
    );
  }
  updateRelayConfiguration(config) {
    this.service.updateRelayConif(config).subscribe((res) => {
      if (res.status === "OK") {
        this.snackbar.openCustomSnackBar("manage_relays_module." + res.message, 'bottom', 'center', true);
      }
    });
  }
  updateSettings() {
    this.updateRelayConfiguration({
      sprDeletionDate: this.relayConfiguration.sprDeletionDate,
      relayConfigId: this.relayConfiguration.relayConfigId,
    });
  }
  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
    this.configSubscription.unsubscribe();
  }
}
