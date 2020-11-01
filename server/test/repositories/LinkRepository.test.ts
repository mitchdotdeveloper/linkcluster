/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import { expect } from 'chai';
import db from 'connectDB';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { after, before, describe, test } from 'mocha';
import { QueryResult } from 'pg';
import { LinkDTO, LinkRepository } from 'repositories/LinkRepository';
import { SinonStub, stub } from 'sinon';

describe('LinkRepository Suite', () => {
  const linkRepository: LinkRepository = container.get<LinkRepository>(
    TYPES.LinkRepository
  );

  let queryStub: SinonStub;

  before(() => {
    queryStub = stub(db, 'query');
    queryStub
      .withArgs(
        'INSERT INTO links(userID, linkTitle, link) VALUES ($1, $2, $3) RETURNING linkID, linkTitle, link;',
        [12, 'myLink', 'www.link.com']
      )
      .resolves(<QueryResult<Omit<LinkDTO, 'userID'>>>{
        rows: [
          {
            linkID: 16,
            linkTitle: 'myLink',
            link: 'www.link.com',
          },
        ],
        rowCount: 1,
      });

    queryStub
      .withArgs(
        'INSERT INTO links(userID, linkTitle, link) VALUES ($1, $2, $3) RETURNING linkID, linkTitle, link;',
        [12, '', 'www.link.com']
      )
      .resolves(<QueryResult<never>>{
        rows: [],
        rowCount: 0,
      });

    queryStub
      .withArgs(
        `SELECT userID,linkID,linkTitle,link FROM links WHERE userID = $1;`,
        [12]
      )
      .resolves(<QueryResult<LinkDTO>>{
        rows: [
          { userID: 12, linkID: 16, linkTitle: 'link1', link: 'www.link1.com' },
          { userID: 12, linkID: 17, linkTitle: 'link2', link: 'www.link2.com' },
          { userID: 12, linkID: 22, linkTitle: 'link3', link: 'www.link3.com' },
        ],
        rowCount: 3,
      });

    queryStub
      .withArgs(
        `SELECT userID,linkID,linkTitle,link FROM links WHERE userID = $1;`,
        [11]
      )
      .resolves(<QueryResult<never>>{
        rows: [],
        rowCount: 0,
      });

    queryStub
      .withArgs(
        `UPDATE links SET linkTitle = $1,link = $2 WHERE linkID = $3 RETURNING linkID;`,
        ['newLinkTitle', 'newLink', 16]
      )
      .resolves(<QueryResult<Pick<LinkDTO, 'linkID'>>>{
        rows: [{ linkID: 16 }],
        rowCount: 1,
      });

    queryStub
      .withArgs(
        `UPDATE links SET linkTitle = $1,link = $2 WHERE linkID = $3 RETURNING linkID;`,
        ['newLinkTitle', 'newLink', 15]
      )
      .resolves(<QueryResult<never>>{
        rows: [],
        rowCount: 0,
      });
  });
  after(() => {
    queryStub.restore();
  });

  test('create()  : creates new link in links table', async () => {
    expect(
      await linkRepository.create(12, 'myLink', 'www.link.com')
    ).to.be.deep.equal(<Omit<LinkDTO, 'userID'>>{
      linkID: 16,
      linkTitle: 'myLink',
      link: 'www.link.com',
    });
  });

  test('create()  : cant create a new link in links table', async () => {
    expect(await linkRepository.create(12, '', 'www.link.com')).to.be.null;
  });

  test('readAll() : finds all links for the given userID', async () => {
    expect(await linkRepository.readAll(12)).to.be.deep.equal(<LinkDTO[]>[
      { userID: 12, linkID: 16, linkTitle: 'link1', link: 'www.link1.com' },
      { userID: 12, linkID: 17, linkTitle: 'link2', link: 'www.link2.com' },
      { userID: 12, linkID: 22, linkTitle: 'link3', link: 'www.link3.com' },
    ]);
  });

  test('readAll() : does not find links for the given userID', async () => {
    expect(await linkRepository.readAll(11)).to.be.null;
  });

  test('update()  : updates information for given fields on link with given linkID', async () => {
    expect(
      await linkRepository.update({
        linkID: 16,
        linkTitle: 'newLinkTitle',
        link: 'newLink',
      })
    ).to.be.deep.equal(<Pick<LinkDTO, 'linkID'>>{ linkID: 16 });
  });

  test('update()  : does not update link as the fields are falsy', async () => {
    expect(
      await linkRepository.update({
        linkID: 16,
        link: '',
        linkTitle: '',
      })
    ).to.be.null;
  });

  test('update()  : does not update link as the link is not found in links table', async () => {
    expect(
      await linkRepository.update({
        linkID: 15,
        linkTitle: 'newLinkTitle',
        link: 'newLink',
      })
    ).to.be.null;
  });
});
