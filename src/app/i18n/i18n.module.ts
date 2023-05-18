import {
  APP_INITIALIZER,
  LOCALE_ID,
  ModuleWithProviders,
  NgModule,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { LocalizationService } from "./localization.service";
import { LocalizationServiceConfig } from "./localization-config.service";
import {
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import {
  TranslateCacheModule,
  TranslateCacheService,
  TranslateCacheSettings,
} from "ngx-translate-cache";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings],
      },
      cacheMechanism: "Cookie",
    }),
  ],
  exports: [TranslateModule],
})
export class I18nModule {
  public static forRoot(config: any): ModuleWithProviders<I18nModule> {
    return {
      ngModule: I18nModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initLocalizationService,
          deps: [LocalizationService],
          multi: true,
        },
        LocalizationService,
        { provide: LOCALE_ID, useValue: config.locale_id }, // using the initial value
        { provide: LocalizationServiceConfig, useValue: config },
      ],
    };
  }
  constructor(
    translate: TranslateService,
    translateCacheService: TranslateCacheService
  ) {
    translateCacheService.init();
    translate.addLangs(["en", "fr"]);
    const browserLang =
      translateCacheService.getCachedLanguage() || translate.getBrowserLang();
    //  const browserLang = 'en';
    translate.use(browserLang.match(/en|fr/) ? browserLang : "en");
  }
}

// eslint-disable-next-line
export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

// eslint-disable-next-line
export function translateCacheFactory(
  translateService: TranslateService,
  translateCacheSettings: TranslateCacheSettings
) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}
/**
 * Initialize the localization service.
 * @param {LocalizationService} service
 * @returns {() => Promise<void>}
 */
export function initLocalizationService(service: LocalizationService) {
  return () => service.initService();
}
