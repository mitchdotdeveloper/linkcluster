/* eslint-disable no-unused-expressions */
import { afterEach, describe, test } from 'mocha';
import { expect } from 'chai';
import { SinonSpy, spy } from 'sinon';
import type { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from 'middlewares/authenticate';

describe('middlewares/authenticate Suite', () => {
  process.env.JWT_SECRET =
    'be3a717845b086a0d1af87f196ed02b1be189b0b6f356cfae0405471fc43ebb2';
  let req: any = { headers: {} };
  let res: any = {};
  let next = () => {};

  afterEach(() => {
    req = { headers: {} };
    res = {};
    next = () => {};
  });

  test('authenticateJWT() : successfully passes request through', () => {
    req.headers.authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pdGNoIiwiaWF0IjoxNjEwMDcyMTUyfQ.zurbENyOPyF0hJSfFBtnfLxeZ9daFm4rvmvnn6oVaGc';
    next = spy();

    authenticateJWT(req as Request, res as Response, next as NextFunction);

    expect((next as SinonSpy).called).to.be.true;
  });

  test('authenticateJWT() : returns 403 as there was no JWT', () => {
    req.headers.authorization = '';
    res.sendStatus = spy();

    authenticateJWT(req as Request, res as Response, next as NextFunction);

    expect((res.sendStatus as SinonSpy).calledOnceWith(403)).to.be.true;
  });

  test('authenticateJWT() : returns 403 as there was an invalid JWT', () => {
    req.headers.authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pdGNoIiwiaWF0IjoxNjEwMDcyMzM2LCJleHAiOjE2MTAwNzIzMzd9.6vc7Ft8af9dePYwy9WmbYrfAoFFJTCzfdOHuSMHiXiY';
    res.sendStatus = spy();

    authenticateJWT(req as Request, res as Response, next as NextFunction);

    expect((res.sendStatus as SinonSpy).calledOnceWith(403)).to.be.true;
  });
});
