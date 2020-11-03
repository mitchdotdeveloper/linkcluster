export class User {
  private userID: number;
  private username: string;
  private _password: string = '';
  private _salt: string = '';

  constructor(
    userID: number,
    username: string,
    password: string,
    salt: string
  ) {
    this.userID = userID;
    this.username = username;
    this._password = password;
    this._salt = salt;
  }

  getUserID(): number {
    return this.userID;
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

  setUserID(userID: number) {
    this.userID = userID;
    return this;
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
