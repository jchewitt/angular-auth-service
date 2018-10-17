import { AuthService } from "./services/auth.service";
import { ConfigService } from "./services/config.service";
import { IHttpConfig } from "./models/http-config.interface";

export function propertiesResolverFactory(appConfig: ConfigService, authService: AuthService, config: IHttpConfig): any {
  return () => {
    return appConfig.load(config)
      .toPromise()
      .then(() => {
        authService.initialize();
      });
  };
}
