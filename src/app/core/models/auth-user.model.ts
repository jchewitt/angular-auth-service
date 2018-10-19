//Would typically do an oAuth setup, but since we're using jwt we're just using token
export class AuthUser {
  public token: string = '';
  public token_type: string = 'Bearer';
  public expires_in: number = 1;
  public expired: boolean = false;
}
