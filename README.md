# angular-auth-service  

Auth module utilizing http interceptors and app config.  Currently there is a login and protected area.  The node service utilized for the example can be found at [this repo](https://github.com/jchewitt/exploratory-api).  

There's a [hosted example](http://jh-ng-auth.herokuapp.com/) where you can register and login to test functionality. Credentials for a test login are _user@example.com_/_password_.

### Table of Contents
- [Getting Started](#getting-started)
- [Expanding Authentication](#expanding-authentication)
- [Definitions](#definitions)
  - [App Config](#app-config)
  - [Interceptors](#interceptors)
- [CI](#ci)

## Getting Started
Clone this project along with the node service located [here](https://github.com/jchewitt/exploratory-api).  
You'll need the node service running to test locally.

Install node_modules

	npm i

Serve the project

	npm start
	
## Expanding Authentication
Currently this uses JSON Web Tokens for simplicity. However it was originally designed for oAuth implementation. It can easily be altered to work with an oAuth flow and is currently a foundation for enterprise SPA authentication.You'll notice in the auth config model that it is setup for token type along with access token. With some basic changes in the auth service the method for getting the authorization header can be changed to use these.
## Definitions
### App Config

_config.service_
The config service handles all loading the config model passed in from _app.module_ to _core.module_
```
....

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
        Object.keys(res).forEach(key => {
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

....
```

This is obtained in  _core.module.ts_ through the `forRoot` method. Here we're providing a an app initializer factory and injected the config service along with the `CONFIG` object which is using the `config` value passed into the `forRoot` method from _app.module_. This ensures that we load the app config before we load anything else. This allows us to setup our api urls for our interceptors before they're needed anywhere else _(route guards, translations, etc...)_.
```
....
export class CoreModule {
  public static forRoot(config?: IHttpConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ....
        ConfigService,
        {provide: 'CONFIG', useValue: config},
        {
          provide: APP_INITIALIZER,
          useFactory: propertiesResolverFactory,
          deps: [ConfigService, AuthService, [new Inject('CONFIG')]],
          multi: true
        }
      }]
    }
  }
}  
```
Since the config could be loaded via properties file loaded asynchronously or a static config object stored in the app, or even through a call to a service to expose it we must stall the loading of the application until that process has completed. Our `propertiesResolverFactory` does just that, and then initializes the auth service which in turn depends on items stored in the `config`.
```
export function propertiesResolverFactory(appConfig: ConfigService, authService: AuthService, config: IHttpConfig): any {
  return () => {
    return appConfig.load(config)
      .toPromise().then(() => {
        authService.initialize();
      });
  };
} 
```
### Interceptors
Through the interceptors authorization headers or any custom headers defined in the config service are added.

**Interceptor Urls**
The `InterceptorUrl`s provided in the config service are used by the auth interceptor to replace url keys with actual urls and define custom headers.
```
export class InterceptorUrls {
  [key: string]: {
    root: string;
    isAuth: boolean;
    headers?: CustomHeaders;
  };
}
```
Root is replaced with the auth interceptor.

**Auth Interceptor**
```
/**
* Replace url placeholders (i.e. "apiurl://endpoint" -> "http://myapi/endpoint")
*/
private discoverUrlReplacement(req: HttpRequest<any>, headers?: any): string {
  let refactoredUrl = req.url;
  for (const key in this.httpConfig.interceptUrls) {
    if (req.url.startsWith(key)) {
      refactoredUrl = req.url.replace(key, this.httpConfig.interceptUrls[key].root);
      if (this.httpConfig.interceptUrls[key].isAuth) this.setAuthorizationHeader(headers);
      if (this.httpConfig.interceptUrls[key].headers) this.runCustomHeaders(headers, this.httpConfig.interceptUrls[key].headers);
    }
  }
  return refactoredUrl;
}
```
Authorization headers are added here as well if it's flagged _isAuth_ in the interceptor url.
	
	if (this.httpConfig.interceptUrls[key].isAuth) this.setAuthorizationHeader(headers);

## CI
On successful merge into the **dev** branch a deployment is triggered on [Travis CI](https://travisci.org) and the app is deployed to [Heroku](https://www.heroku.com) where it is hosted.
