import { injectable } from 'inversify';
import { stripFalsyProperties } from '../utilities/filter';
import db from '../connectDB';

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
  update(
    linkObj: Omit<LinkDTO, 'userID'>
  ): Promise<Pick<LinkDTO, 'linkID'> | null>;
}

@injectable()
export class LinkRepositoryImpl implements LinkRepository {
  public async create(userID: number, linkTitle: string, link: string) {
    const { rows, rowCount } = await db.query<
      Pick<LinkDTO, 'linkID' | 'linkTitle' | 'link'>
    >(
      'INSERT INTO links(userID, linkTitle, link) VALUES ($1, $2, $3) RETURNING linkID, linkTitle, link;',
      [userID, linkTitle, link]
    );

    if (!rowCount) return null;

    return rows[0];
  }

  public async readAll(userID: number): Promise<LinkDTO[] | null> {
    const linkFields: (keyof LinkDTO)[] = [
      'userID',
      'linkID',
      'linkTitle',
      'link',
    ];
    const links = await db.query<LinkDTO>(
      `SELECT ${linkFields.toString()} FROM links WHERE userID = $1;`,
      [userID]
    );

    if (!links.rowCount) return null;

    return links.rows;
  }

  public async update(
    linkObj: Omit<LinkDTO, 'userID'>
  ): Promise<Pick<LinkDTO, 'linkID'> | null> {
    const { linkID, linkTitle, link } = linkObj;
    const propertiesToUpdate = stripFalsyProperties({
      linkTitle,
      link,
    });
    let paramPlaceholder = 1;
    const updateQueryFields = Object.keys(propertiesToUpdate).map(
      (key) => `${key} = $${paramPlaceholder++}`
    );

    if (!updateQueryFields.length) return null;

    const linkResult = await db.query<Pick<LinkDTO, 'linkID'>>(
      `UPDATE links SET ${updateQueryFields.toString()} WHERE linkID = $${paramPlaceholder} RETURNING linkID;`,
      [...(Object.values(propertiesToUpdate) as (string | number)[]), linkID]
    );

    if (!linkResult.rowCount) return null;

    return linkResult.rows[0];
  }
}
