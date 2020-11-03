/* eslint-disable no-unused-expressions */
import { afterEach, describe, test } from 'mocha';
import { expect } from 'chai';
import { SinonSpy, spy } from 'sinon';
import type { Request, Response, NextFunction } from 'express';
import { authenticate } from 'middlewares/authenticate';

describe('middlewares/authenticate Suite', () => {
  let req: any = {};
  let res: any = {};
  let next = () => {};

  afterEach(() => {
    req = {};
    res = {};
    next = () => {};
  });

  test('authenticate() : successfully passes request through', () => {
    req.session = { loggedIn: true };
    req.sessionID = 'sessionid';
    next = spy();

    authenticate(req as Request, res as Response, next as NextFunction);

    expect((next as SinonSpy).called).to.be.true;
  });

  test('authenticate() : returns 403 as there was no session', () => {
    req.session = undefined;
    req.sessionID = 'sessionid';
    res.sendStatus = spy();

    authenticate(req as Request, res as Response, next as NextFunction);

    expect((res.sendStatus as SinonSpy).calledOnceWith(403)).to.be.true;
  });

  test('authenticate() : returns 403 as there was no sessionId', () => {
    req.session = {};
    req.sessionID = '';
    res.sendStatus = spy();

    authenticate(req as Request, res as Response, next as NextFunction);

    expect((res.sendStatus as SinonSpy).calledOnceWith(403)).to.be.true;
  });

  test('authenticate() : returns 403 as the loggedIn key on the session object was false', () => {
    req.session = { loggedIn: false };
    req.sessionID = 'sessionId';
    res.sendStatus = spy();

    authenticate(req as Request, res as Response, next as NextFunction);

    expect((res.sendStatus as SinonSpy).calledOnceWith(403)).to.be.true;
  });
});
