import { Application, Router } from 'express';
import type { RegistrableController } from '../controllers/RegistrableController';
import { injectable } from 'inversify';
import { authenticate } from '../middlewares/authenticate';
import type { LinkDTO } from '../repositories/LinkRepository';

@injectable()
export class LinkController implements RegistrableController {
  public register(app: Application) {
    const linkRouter = Router();

    app.use('/link', linkRouter);

    linkRouter.post('/', authenticate, async (req, res) => {
      const { userID, linkTitle, link } = req.body as Omit<LinkDTO, 'linkID'>;

      if (!userID || !linkTitle || !link) return res.sendStatus(400);

      // const createdLink = await this.linkService.createLink(userID, linkTitle, link);

      // if (!createdLink) return res.sendStatus(500);

      // return res.status(201).send(stripSensitiveProperties(createdLink));
    });

    linkRouter.patch('/', authenticate, async (req, res) => {
      const { linkID, linkTitle, link } = req.body as Omit<LinkDTO, 'userID'>;

      if (!linkID || (!linkTitle && !link)) return res.sendStatus(400);

      // const updatedLink = await this.linkService.updateLink(linkID, linkTitle, link);

      // if (!updatedLink) return res.sendStatus(500);

      // return res.status(200).send({linkID: updatedLink.getLinkID()});
    });

    const linksRouter = Router();

    app.use('/links', linksRouter);

    linksRouter.get('/', authenticate, async (req, res) => {
      const { userID } = (req.query as unknown) as Pick<LinkDTO, 'userID'>;

      if (!userID) return res.sendStatus(400);

      // const links = await this.linkService.getLinks(userID);

      // if (!links) return res.sendStatus(404)

      // return res.status(200).send(links);
    });
  }
}
