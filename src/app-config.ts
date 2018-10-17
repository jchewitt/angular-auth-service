import { IHttpConfig } from "./app/core/models/http-config.interface";
import { environment } from "./environments/environment";

export const CONFIG = <IHttpConfig> {
  interceptUrls: {
      'api://': {
          root: environment.root_api_url,
          isAuth: true,
          headers: {}
      }
  },
  authConfig: {
    authority: environment.authority,
    authCheck: environment.authority_check_url
  },
  propertiesFile: null
};
