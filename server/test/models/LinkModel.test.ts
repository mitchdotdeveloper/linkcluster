import 'reflect-metadata';
import { describe, test } from 'mocha';
import { expect } from 'chai';
import { Link } from 'models/LinkModel';

describe('LinkModel Suite', () => {
  const user: Link = new Link(16, 1, 'myLink', 'www.mitchohair.dev');

  test('getUserID()    : returns member userID', () => {
    expect(user.getUserID()).to.be.equal(16);
  });

  test('getLinkID()    : returns member linkID', () => {
    expect(user.getLinkID()).to.be.equal(1);
  });

  test('getLinkTitle() : returns member linkTitle', () => {
    expect(user.getLinkTitle()).to.be.equal('myLink');
  });

  test('getLink()      : returns member link', () => {
    expect(user.getLink()).to.be.equal('www.mitchohair.dev');
  });

  test('setUserID()    : sets member userID', () => {
    expect(user.setUserID(15).getUserID()).to.be.equal(15);
  });

  test('setLinkID()    : sets member linkID', () => {
    expect(user.setLinkID(2).getLinkID()).to.be.equal(2);
  });

  test('setLinkTitle() : sets member linkTitle', () => {
    expect(user.setLinkTitle('myNewLink').getLinkTitle()).to.be.equal(
      'myNewLink'
    );
  });

  test('setLink()      : sets member link', () => {
    expect(user.setLink('www.google.com').getLink()).to.be.equal(
      'www.google.com'
    );
  });
});
