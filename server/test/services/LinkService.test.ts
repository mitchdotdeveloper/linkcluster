// /* eslint-disable no-unused-expressions */
// import 'reflect-metadata';
// import container from 'inversify.config';
// import TYPES from 'inversifyTypes';
// import { describe, before, beforeEach, after, test } from 'mocha';
// import { LinkService } from 'services/LinkService';
// import { LinkDTO, LinkRepository } from 'repositories/LinkRepository';
// import { OmitClassMethods } from 'types';
// import { expect } from 'chai';
// import { User } from 'models/UserModel';

// describe('LinkService Suite', () => {
//   before(() => {
//     container.snapshot();
//   });
//   beforeEach(() => {
//     container.unbind(TYPES.LinkRepository);
//   });
//   after(() => {
//     container.restore();
//   });

//   test('createUser() : creates new user', async () => {
//     container.bind<LinkRepository>(TYPES.LinkRepository).toConstantValue(<
//       LinkRepository
//     >{
//       create: (_username: string, _password: string, _salt: string) =>
//         Promise.resolve<Pick<UserDTO, 'userid' | 'username'>>({
//           userid: 16,
//           username: 'username',
//         }),
//     });
//     const userService: UserService = container.get<UserService>(
//       TYPES.UserService
//     );

//     expect(
//       await userService.createUser('username', 'password', 'salt')
//     ).to.be.deep.equal(<OmitClassMethods<User>>{
//       userID: 16,
//       username: 'username',
//       _password: undefined,
//       _salt: undefined,
//     });
//   });
// });
