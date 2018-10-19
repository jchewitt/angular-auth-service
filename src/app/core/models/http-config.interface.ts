import { InterceptorUrls } from "./interceptor-urls.model";
import { AuthConfig } from "./auth-config.model";

export interface IHttpConfig {
  interceptUrls?: InterceptorUrls;
  propertiesFile?: string;
  authConfig?: AuthConfig;
  meta?: any;
  appId?: string;
}
