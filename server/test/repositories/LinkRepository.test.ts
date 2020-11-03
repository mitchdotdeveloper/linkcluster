/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import { expect } from 'chai';
import { knex } from 'connectDB';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { afterEach, describe, test } from 'mocha';
import { LinkDTO, LinkRepository } from 'repositories/LinkRepository';
import { SinonStub, stub } from 'sinon';

describe('LinkRepository Suite', () => {
  const linkRepository: LinkRepository = container.get<LinkRepository>(
    TYPES.LinkRepository
  );

  let knexStub: SinonStub;

  afterEach(() => {
    knexStub.restore();
  });

  test('create()  : creates new link in links table', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      insert: stub()
        .withArgs({ userID: 12, linkTitle: 'myLink', link: 'www.link.com' })
        .returnsThis(),
      returning: stub()
        .withArgs(['linkID', 'linkTitle', 'link'])
        .resolves([
          {
            linkID: 16,
            linkTitle: 'myLink',
            link: 'www.link.com',
          },
        ]),
    }));

    expect(
      await linkRepository.create(12, 'myLink', 'www.link.com')
    ).to.be.deep.equal(<Omit<LinkDTO, 'userID'>>{
      linkID: 16,
      linkTitle: 'myLink',
      link: 'www.link.com',
    });
  });

  test('readAll() : finds all links for the given userID', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      select: stub()
        .withArgs('userID', 'linkID', 'linkTitle', 'link')
        .returnsThis(),
      where: stub()
        .withArgs({ userID: 12 })
        .resolves([
          { userID: 12, linkID: 16, linkTitle: 'link1', link: 'www.link1.com' },
          { userID: 12, linkID: 17, linkTitle: 'link2', link: 'www.link2.com' },
          { userID: 12, linkID: 22, linkTitle: 'link3', link: 'www.link3.com' },
        ]),
    }));

    expect(await linkRepository.readAll(12)).to.be.deep.equal(<LinkDTO[]>[
      { userID: 12, linkID: 16, linkTitle: 'link1', link: 'www.link1.com' },
      { userID: 12, linkID: 17, linkTitle: 'link2', link: 'www.link2.com' },
      { userID: 12, linkID: 22, linkTitle: 'link3', link: 'www.link3.com' },
    ]);
  });

  test('readAll() : does not find links for the given userID', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      select: stub()
        .withArgs('userID', 'linkID', 'linkTitle', 'link')
        .returnsThis(),
      where: stub().withArgs({ userID: 11 }).resolves([]),
    }));

    expect(await linkRepository.readAll(11)).to.be.null;
  });

  test('update()  : updates information for given fields on link with given linkID', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      update: stub()
        .withArgs({
          linkID: 16,
          linkTitle: 'newLinkTitle',
          link: 'newLink',
        })
        .returnsThis(),
      where: stub().withArgs({ linkID: 16 }).returnsThis(),
      returning: stub().withArgs('linkID').resolves([16]),
    }));

    expect(
      await linkRepository.update({
        linkID: 16,
        linkTitle: 'newLinkTitle',
        link: 'newLink',
      })
    ).to.be.deep.equal(<LinkDTO['linkID']>16);
  });
});
