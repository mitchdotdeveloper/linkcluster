import { injectable, inject } from 'inversify';
import { Link } from '../models/LinkModel';
import TYPES from '../inversifyTypes';
import { LinkDTO, LinkRepository } from '../repositories/LinkRepository';

export interface LinkService {
  createLink(
    userID: number,
    linkTitle: string,
    link: string
  ): Promise<Link | null>;
  updateLink(
    linkID: number,
    linkTitle: string,
    link: string
  ): Promise<Link | null>;
  getLinks(userID: number): Promise<LinkDTO[] | null>;
}

@injectable()
export class LinkServiceImpl implements LinkService {
  @inject(TYPES.LinkRepository)
  private linkRepository!: LinkRepository;

  private toLink(linkDTO: LinkDTO) {
    return new Link(
      linkDTO.userID,
      linkDTO.linkID,
      linkDTO.linkTitle,
      linkDTO.link
    );
  }

  public async createLink(
    userID: number,
    linkTitle: string,
    link: string
  ): Promise<Link | null> {
    const createdLink = await this.linkRepository.create(
      userID,
      linkTitle,
      link
    );

    if (!createdLink) return null;

    return this.toLink(createdLink as LinkDTO);
  }

  public async updateLink(
    linkID: number,
    linkTitle: string,
    link: string
  ): Promise<Link | null> {
    const updatedLinkID = await this.linkRepository.update({
      linkID,
      linkTitle,
      link,
    });

    if (!updatedLinkID) return null;

    return this.toLink({ linkID: updatedLinkID } as LinkDTO);
  }

  public async getLinks(userID: number): Promise<LinkDTO[] | null> {
    const links = await this.linkRepository.readAll(userID);

    if (!links) return null;

    return links;
  }
}
