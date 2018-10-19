const ROOT = 'https://angular-exploratory-api.herokuapp.com';
export const environment = {
  production: true,
  authority: `${ROOT}/auth/login`,
  authority_check_url: `${ROOT}/auth/check`,
  root_api_url: `${ROOT}/api`,
  user_service: `${ROOT}/users`
};
