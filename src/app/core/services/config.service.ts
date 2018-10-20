import { Injectable } from "@angular/core";
import { IHttpConfig } from "../models/http-config.interface";
import { InterceptorUrls } from "../models/interceptor-urls.model";
import { AuthConfig } from "../models/auth-config.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { tap } from "rxjs/operators";
import { of } from 'rxjs';
import { CustomHeaders } from "../models/custom-headers.model";

@Injectable()
export class ConfigService implements IHttpConfig {
  public interceptUrls: InterceptorUrls = {};
  public authConfig: AuthConfig;
  public propertiesFile: string = null;
  public meta: any = {};
  public appId: string = '';

  constructor(private http?: HttpClient) {
  }

  /**
   * Loads the application properties via config service or other.
   * @param {IHttpConfig} config
   * @returns {Observable<any>}
   */
  public load(config: IHttpConfig): Observable<any> {
    if (config) {
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      });
    } else if (!config) {
      config = {propertiesFile: '/properties.json'};
    }
    if (config && config.propertiesFile) {
      return this.http.get(config.propertiesFile)
        .pipe(tap(res => {
          Object.keys(res)
            .forEach(key => {
              this[key] = res[key];
            });
        }));
    } else {

      return of({});
    }
  }

  /**
   * Sets custom headers for http interception
   * @param {string} interceptorUrl
   * @param {CustomHeaders} headers
   */
  public setInterceptorHeaders(interceptorUrl: string, headers: CustomHeaders): void {
    const configGroup = this.interceptUrls[interceptorUrl];
    configGroup.headers = configGroup.headers || {};
    Object.keys(headers).forEach(key => {
      configGroup.headers[key] = headers[key];
    });
  }
}
