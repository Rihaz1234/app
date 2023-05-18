import { Injectable, Optional, SkipSelf } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { LocalizationServiceConfig } from "./localization-config.service";

/**
 * Class representing the translation service.
 */
@Injectable()
export class LocalizationService {
  private _localeId: string = "en-US"; // default

  /**
   * @constructor
   * @param {LocalizationService} singleton - the localization service
   * @param {LocalizationServiceConfig} config - the localization config
   * @param {TranslateService} translateService - the translate service
   */
  constructor(
    @Optional() @SkipSelf() private singleton: LocalizationService,
    private config: LocalizationServiceConfig,
    private translateService: TranslateService
  ) {
    if (this.singleton) {
      throw new Error(
        "LocalizationService is already provided by the root module"
      );
    }
    this._localeId = this.config.locale_id;
  }

  /**
   * Initialize the service.
   * @returns {Promise<void>}
   */
  public initService(): Observable<any> {
    // language code same as file name.
    this._localeId = localStorage.getItem("language") || "en-US";
    return this.useLanguage(this._localeId);
  }

  /**
   * change the selected language
   * @returns {Promise<void>}
   */
  public useLanguage(lang: string): Observable<any> {
    this.translateService.setDefaultLang(lang);
    return this.translateService.use(lang).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }

  /**
   * Gets the instant translated value of a key (or an array of keys).
   * @param key
   * @param interpolateParams
   * @returns {string|any}
   */
  public translate(key: string | string[], interpolateParams?: object): string {
    return this.translateService.instant(key, interpolateParams) as string;
  }
}
