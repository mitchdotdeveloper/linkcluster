export class User {
  private username: string;
  private password: string = '';
  private salt: string = '';

  constructor(username: string, password: string, salt: string) {
    this.username = username;
    this.password = password;
    this.salt = salt;
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
