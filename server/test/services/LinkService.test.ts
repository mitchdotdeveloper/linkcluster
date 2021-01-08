/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { describe, before, beforeEach, after, test } from 'mocha';
import { LinkService } from 'services/LinkService';
import { LinkDTO, LinkRepository } from 'repositories/LinkRepository';
import { OmitClassMethods } from 'types';
import { expect } from 'chai';
import { Link } from 'models/LinkModel';

describe('LinkService Suite', () => {
  before(() => {
    container.snapshot();
  });
  beforeEach(() => {
    container.unbind(TYPES.LinkRepository);
  });
  after(() => {
    container.restore();
  });

  test('createLink() : creates new link', async () => {
    container.bind<LinkRepository>(TYPES.LinkRepository).toConstantValue(<
      LinkRepository
    >{
      create: (_userID: number, _linkTitle: string, _link: string) =>
        Promise.resolve<Pick<LinkDTO, 'linkID' | 'linkTitle' | 'link'>>({
          linkID: 1,
          linkTitle: 'myLink',
          link: 'www.google.com',
        }),
    });
    const linkService: LinkService = container.get<LinkService>(
      TYPES.LinkService
    );

    expect(
      await linkService.createLink(16, 'myLink', 'www.google.com')
    ).to.be.deep.equal(<OmitClassMethods<Link>>{
      userID: undefined,
      linkID: 1,
      linkTitle: 'myLink',
      link: 'www.google.com',
    });
  });

  test('createLink() : does not create a new link', async () => {
    container.bind<LinkRepository>(TYPES.LinkRepository).toConstantValue(<
      LinkRepository
    >{
      create: (_userID: number, _linkTitle: string, _link: string) =>
        Promise.resolve(null),
    });
    const linkService: LinkService = container.get<LinkService>(
      TYPES.LinkService
    );

    expect(await linkService.createLink(16, (null as unknown) as string, '')).to
      .be.null;
  });

  test('updateLink() : update link with given linkID', async () => {
    container.bind<LinkRepository>(TYPES.LinkRepository).toConstantValue(<
      LinkRepository
    >{
      update: (_linkObj: Partial<Omit<LinkDTO, 'userID'>>) =>
        Promise.resolve<LinkDTO['linkID']>(1),
    });
    const linkService: LinkService = container.get<LinkService>(
      TYPES.LinkService
    );

    expect(
      await linkService.updateLink(16, 'myNewLinkTitle', 'www.google.com')
    ).to.be.deep.equal(<OmitClassMethods<Link>>{
      userID: undefined,
      linkID: 1,
      linkTitle: undefined,
      link: undefined,
    });
  });

  test("updateLink() : doesn't update link as linkID does not exist", async () => {
    container.bind<LinkRepository>(TYPES.LinkRepository).toConstantValue(<
      LinkRepository
    >{
      update: (_linkObj: Partial<Omit<LinkDTO, 'userID'>>) =>
        Promise.resolve(null),
    });
    const linkService: LinkService = container.get<LinkService>(
      TYPES.LinkService
    );

    expect(
      await linkService.updateLink(
        (undefined as unknown) as number,
        'myNewLinkTitle',
        'www.google.com'
      )
    ).to.be.null;
  });

  test('getLinks()   : get all link with given userID', async () => {
    container.bind<LinkRepository>(TYPES.LinkRepository).toConstantValue(<
      LinkRepository
    >{
      readAll: (_userID: number) =>
        Promise.resolve<LinkDTO[]>([
          {
            userID: 16,
            linkID: 1,
            linkTitle: 'myLink',
            link: 'www.google.com',
          },
        ]),
    });
    const linkService: LinkService = container.get<LinkService>(
      TYPES.LinkService
    );

    expect(await linkService.getLinks(16)).to.be.deep.equal(<LinkDTO[]>[
      {
        userID: 16,
        linkID: 1,
        linkTitle: 'myLink',
        link: 'www.google.com',
      },
    ]);
  });

  test("getLinks()   : doesn't get links as user does not have any", async () => {
    container.bind<LinkRepository>(TYPES.LinkRepository).toConstantValue(<
      LinkRepository
    >{
      readAll: (_userID: number) => Promise.resolve(null),
    });
    const linkService: LinkService = container.get<LinkService>(
      TYPES.LinkService
    );

    expect(await linkService.getLinks(15)).to.be.null;
  });
});
