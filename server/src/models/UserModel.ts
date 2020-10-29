export class User {
  private username: string;
  private _password: string = '';
  private _salt: string = '';

  constructor(username: string, password: string, salt: string) {
    this.username = username;
    this._password = password;
    this._salt = salt;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this._password;
  }

  getSalt(): string {
    return this._salt;
  }

  setUsername(username: string) {
    this.username = username;
    return this;
  }

  setPassword(password: string) {
    this._password = password;
    return this;
  }

  setSalt(salt: string) {
    this._salt = salt;
    return this;
  }
}
