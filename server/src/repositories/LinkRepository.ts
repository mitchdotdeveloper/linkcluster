import { injectable } from 'inversify';
import { knex } from '../connectDB';

export type LinkDTO = {
  userID: number;
  linkID: number;
  linkTitle: string;
  link: string;
};

export interface LinkRepository {
  create(
    userID: number,
    linkTitle: string,
    link: string
  ): Promise<Omit<LinkDTO, 'userID'> | null>;
  readAll(userID: number): Promise<LinkDTO[] | null>;
  update(linkObj: Omit<LinkDTO, 'userID'>): Promise<LinkDTO['linkID'] | null>;
}

@injectable()
export class LinkRepositoryImpl implements LinkRepository {
  public async create(
    userID: number,
    linkTitle: string,
    link: string
  ): Promise<Omit<LinkDTO, 'userID'> | null> {
    const [createdLink] = await knex
      .from<LinkDTO>('links')
      .insert({ userID, linkTitle, link })
      .returning(['linkID', 'linkTitle', 'link']);

    if (!createdLink) return null;

    return createdLink;
  }

  public async readAll(userID: number): Promise<LinkDTO[] | null> {
    const links = await knex
      .from<LinkDTO>('links')
      .select('userID', 'linkID', 'linkTitle', 'link')
      .where({ userID });

    if (!links.length) return null;

    return links;
  }

  public async update(
    linkObj: Omit<LinkDTO, 'userID'>
  ): Promise<LinkDTO['linkID'] | null> {
    const [linkID] = await knex
      .from<LinkDTO>('links')
      .update(linkObj)
      .where({ linkID: linkObj.linkID })
      .returning('linkID');

    if (!linkID) return null;

    return linkID;
  }
}
