import { CustomHeaders } from "./custom-headers.model";

export class InterceptorUrls {
  [key: string]: {
    root: string;
    isAuth: boolean;
    headers?: CustomHeaders;
  };
}

