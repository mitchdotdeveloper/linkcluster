export class User {
  public userID: number;
  private username: string;
  private password: string = '';
  private salt: string = '';

  constructor(
    userID: number,
    username: string,
    password: string,
    salt: string
  ) {
    this.userID = userID;
    this.username = username;
    this.password = password;
    this.salt = salt;
  }

  getUserID(): number {
    return this.userID;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getSalt(): string {
    return this.salt;
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
    this.password = password;
    return this;
  }

  setSalt(salt: string) {
    this.salt = salt;
    return this;
  }
}
