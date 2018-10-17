export class AuthUser {
  public access_token: string = '';
  public token_type: string = 'Bearer';
  public expires_in: number = 1;
  public expired: boolean = false;
}
