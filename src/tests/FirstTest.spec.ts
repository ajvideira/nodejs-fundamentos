import User from '@models/User';

test('It should be ok', () => {
  const user = new User();
  user.nome = 'Jonathan';

  expect(user.nome).toEqual('Jonathan');
});
