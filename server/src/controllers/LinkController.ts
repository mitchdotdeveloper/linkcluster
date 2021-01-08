import { Application, Router } from 'express';
import type { RegistrableController } from '../controllers/RegistrableController';
import { inject, injectable } from 'inversify';
import { authenticateJWT } from '../middlewares/authenticate';
import { LinkService } from '../services/LinkService';
import TYPES from '../inversifyTypes';

@injectable()
export class LinkController implements RegistrableController {
  @inject(TYPES.LinkService)
  private linkService!: LinkService;

  public register(app: Application) {
    const linksRouter = Router();

    app.use('/links', linksRouter);

    linksRouter.get('/:userID', authenticateJWT, async (req, res) => {
      const { userID } = req.params;

      if (!userID) return res.sendStatus(400);

      const links = await this.linkService.getLinks(Number(userID));

      if (!links) return res.sendStatus(404);

      res.status(200);

      return res.send({ links });
    });

    linksRouter.post('/', authenticateJWT, async (req, res) => {
      const { userID, linkTitle, link } = req.body;

      if (!userID || !linkTitle || !link) return res.sendStatus(400);

      const createdLink = await this.linkService.createLink(
        Number(userID),
        String(linkTitle),
        String(link)
      );

      if (!createdLink) return res.sendStatus(500);

      res.status(201);

      return res.send({ link: createdLink });
    });

    linksRouter.patch('/', authenticateJWT, async (req, res) => {
      const { linkID, linkTitle, link } = req.body;

      if (!linkID || (!linkTitle && !link)) return res.sendStatus(400);

      const updatedLink = await this.linkService.updateLink(
        Number(linkID),
        String(linkTitle),
        String(link)
      );

      if (!updatedLink) return res.sendStatus(500);

      res.status(200);

      return res.send({ linkID: updatedLink.getLinkID() });
    });
  }
}
