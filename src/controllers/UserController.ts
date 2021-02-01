import User from '@models/User';

export default class UserController {
  static teste(): User {
    const user = new User();
    return user;
  }
}
