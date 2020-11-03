export class Link {
  private userID: number;
  private linkID: number;
  private linkTitle: string = '';
  private link: string = '';

  constructor(userID: number, linkID: number, linkTitle: string, link: string) {
    this.userID = userID;
    this.linkID = linkID;
    this.linkTitle = linkTitle;
    this.link = link;
  }

  getUserID(): number {
    return this.userID;
  }

  getLinkID(): number {
    return this.linkID;
  }

  getLinkTitle(): string {
    return this.linkTitle;
  }

  getLink(): string {
    return this.link;
  }

  setUserID(userID: number) {
    this.userID = userID;
    return this;
  }

  setLinkID(linkID: number) {
    this.linkID = linkID;
    return this;
  }

  setLinkTitle(linkTitle: string) {
    this.linkTitle = linkTitle;
    return this;
  }

  setLink(link: string) {
    this.link = link;
    return this;
  }
}
